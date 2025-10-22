import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { CollapsiblePanel } from './components/CollapsiblePanel';
import ControlBar from './components/ControlBar';
import EditCanvas from './components/EditCanvas';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import Lightbox from './components/Lightbox';
import LoadingModal from './components/LoadingModal';
import { NoteEditor } from './components/notes/NoteEditor';
import { Panel2DViews } from './components/panels/Panel2DViews';
import { PanelAngleGeneration } from './components/panels/PanelAngleGeneration';
import { PanelAspectRatio } from './components/panels/PanelAspectRatio';
import { PanelDetails } from './components/panels/PanelDetails';
import { PanelDramatization } from './components/panels/PanelDramatization';
import { PanelGallery } from './components/panels/PanelGallery';
import { PanelImages } from './components/panels/PanelImages';
import { PanelMaterials } from './components/panels/PanelMaterials';
import { PanelPhongNam } from './components/panels/PanelPhongNam';
import { PanelStyle } from './components/panels/PanelStyle';
import ResultDisplay from './components/ResultDisplay';
import { WelcomeScreen } from './components/WelcomeScreen';
import {
  ARCHITECTURAL_STYLES,
  ASPECT_RATIO_OPTIONS,
  CONVERSION_OPTIONS,
  DRAMATIZATION_OPTIONS,
  EXTERIOR_ARCHITECTURAL_DETAILS,
  INPUT_FIDELITY_LEVELS,
  INTERIOR_ARCHITECTURAL_DETAILS,
  INTERIOR_STYLES,
  MATERIAL_COMBINATIONS,
  REFERENCE_STRENGTH_LEVELS,
  ROOM_TYPES,
  VIEW_2D_OPTIONS,
} from './constants';
import {
  generateShortDescription,
} from './services/architecturalDescriptionService';
import { saveToGallery } from './services/galleryService';
import {
  editImage,
  generateImage,
} from './services/geminiService';
import {
  AppMode,
  ArchitecturalElement,
  ArchitecturalStyle,
  AspectRatioOption,
  DramatizationOption,
  ImageFile,
  InputFidelityLevel,
  MaterialCombination,
  PanelType,
  ReferenceStrengthLevel,
  RenovationResult,
} from './types';
import {
  dataUrlToImageFile,
  processBaseImage,
  processImageToAspectRatio,
} from './utils/imageUtils';

const App: React.FC = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Gallery refresh trigger - tăng giá trị này để force PanelGallery reload
    const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);
    
    // Theme State
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    
    // Apply theme on mount and when changed
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);
    
    // Panel Collapse State
    const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
    
    // App State
    const [appMode, setAppMode] = useState<AppMode>('generate');
    const [activePanel, setActivePanel] = useState<PanelType>('context');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<RenovationResult[]>([]);
    const [selectedImage, setSelectedImage] = useState<RenovationResult | null>(null);
    const [imageToEdit, setImageToEdit] = useState<RenovationResult | null>(null);
    const [imageToNote, setImageToNote] = useState<RenovationResult | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    
    // Check for saved auth state on mount
    useEffect(() => {
        const savedAuth = localStorage.getItem('phong_nam_auth');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);
    
    // Canvas chính bắt đầu rỗng - chỉ hiển thị ảnh tạo trong phiên hiện tại
    // Thư viện ảnh (PanelGallery) tự load ảnh từ localStorage
    useEffect(() => {
        if (isAuthenticated) {
            // Không load ảnh cũ vào results - để canvas chính trống
            setResults([]);
        }
    }, [isAuthenticated]);
    
    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('phong_nam_auth', 'true');
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('phong_nam_auth');
        // Reset app state
        setResults([]);
        setSelectedImage(null);
        setBaseImageFile(null);
        setActivePanel('context');
    };
    
    // Panel States
    const [mainPrompt, setMainPrompt] = useState('');
    const [baseImageFile, setBaseImageFile] = useState<ImageFile | null>(null);
    const [referenceImageFile, setReferenceImageFile] = useState<ImageFile | null>(null);
    const [referenceStrength, setReferenceStrength] = useState<ReferenceStrengthLevel>(REFERENCE_STRENGTH_LEVELS[2]); // Default: "Tương tự"
    const [selectedStyle, setSelectedStyle] = useState<ArchitecturalStyle>(ARCHITECTURAL_STYLES[0].styles[0]);
    const [selectedMaterials, setSelectedMaterials] = useState<MaterialCombination | null>(null);
    const [selectedElements, setSelectedElements] = useState<ArchitecturalElement[]>([]);
    const [selectedDramatization, setSelectedDramatization] = useState<DramatizationOption[]>([]);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatioOption>(ASPECT_RATIO_OPTIONS[0]);
    const [inputFidelity, setInputFidelity] = useState<InputFidelityLevel>(INPUT_FIDELITY_LEVELS[2]);

    // Floor Plan Panel state
    const [floorPlanImage, setFloorPlanImage] = useState<ImageFile | null>(null);
    const [selectedConversionType, setSelectedConversionType] = useState<string>(CONVERSION_OPTIONS[0].id);
    const [selectedRoomType, setSelectedRoomType] = useState<string>(ROOM_TYPES[0]);



    const handleImageSelect = useCallback(async (file: File | null, type: 'base' | 'reference' | 'floorPlan') => {
        if (!file) {
            if (type === 'base') setBaseImageFile(null);
            if (type === 'reference') setReferenceImageFile(null);
            if (type === 'floorPlan') setFloorPlanImage(null);
            return;
        }
        
        try {
            const processedFile = selectedAspectRatio.id === 'from_input'
                ? await processBaseImage(file)
                : await processImageToAspectRatio(file, selectedAspectRatio.width / selectedAspectRatio.height);

            if (type === 'base') setBaseImageFile(processedFile);
            if (type === 'reference') setReferenceImageFile(processedFile);
            if (type === 'floorPlan') setFloorPlanImage(processedFile);
        } catch (err) {
            console.error(err);
            setError("Could not process the selected image file.");
        }
    }, [selectedAspectRatio]);

    const buildPrompt = useCallback(() => {
        let parts: string[] = [];
    
        if (mainPrompt) parts.push(mainPrompt);
        
        // If reference image is provided, prioritize it
        if (referenceImageFile) {
            parts.push(`Reference Style: ${referenceStrength.prompt}.`);
            parts.push(`IMPORTANT: Apply the style, materials, colors, and aesthetic from the reference image to the input image structure. ${referenceStrength.prompt}`);
        } else {
            // Use manual selections only if no reference image
            parts.push(`Style: ${selectedStyle.prompt}.`);
            if (selectedMaterials) parts.push(`Materials: ${selectedMaterials.prompt}.`);
            if (selectedElements.length > 0) {
                const elementPrompts = selectedElements.map(e => e.prompt).join(', ');
                parts.push(`Architectural Elements: ${elementPrompts}.`);
            }
            if (selectedDramatization.length > 0) {
                const dramaPrompts = selectedDramatization.map(d => d.prompt).join(', ');
                parts.push(`Atmosphere & Photography: ${dramaPrompts}.`);
            }
        }

        parts.push(`Fidelity to original image structure: ${inputFidelity.prompt}. Maintain the spatial layout, proportions, and composition of the input image.`);
        
        return `Generate a photorealistic architectural visualization. ${parts.join(' ')}`;
    }, [mainPrompt, selectedStyle, selectedMaterials, selectedElements, selectedDramatization, inputFidelity, referenceImageFile, referenceStrength]);
    
    const canGenerate = useMemo(() => {
        if (activePanel === 'views2d') {
            return !!selectedImage;
        }
        return !!baseImageFile || !!floorPlanImage;
    }, [activePanel, selectedImage, baseImageFile, floorPlanImage]);
    
    const handleGenerate = async (customPrompt?: string) => {
        let sourceImageFile: ImageFile | null = null;
    
        // If custom prompt is provided (angle generation or 2D views), use selected 3D image
        if (customPrompt) {
            if (!selectedImage) {
                setError("Vui lòng chọn một ảnh 3D đã tạo.");
                return;
            }
            try {
                sourceImageFile = await dataUrlToImageFile(selectedImage.imageUrl, `source-angle-${selectedImage.id}.png`);
            } catch (err) {
                 setError("Không thể xử lý ảnh đã chọn.");
                 console.error(err);
                 return;
            }
        } else if (activePanel === 'views2d') {
            if (!selectedImage) {
                setError("Vui lòng chọn một ảnh đã tạo để chuyển đổi sang 2D.");
                return;
            }
            try {
                sourceImageFile = await dataUrlToImageFile(selectedImage.imageUrl, `source-2d-${selectedImage.id}.png`);
            } catch (err) {
                 setError("Không thể xử lý ảnh đã chọn.");
                 console.error(err);
                 return;
            }
        } else {
            sourceImageFile = (activePanel === 'category' && floorPlanImage ? floorPlanImage : baseImageFile);
        }
        
        if (!sourceImageFile) {
            setError("Vui lòng tải lên ảnh đầu vào.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        const finalPrompt = customPrompt ? customPrompt : buildPrompt();
        
        try {
            // Pass reference image if available
            const { base64Image } = await generateImage(
                finalPrompt, 
                sourceImageFile.file,
                referenceImageFile?.file
            );
            const imageUrl = `data:image/png;base64,${base64Image}`;
            
            // Tạo result tạm không có description
            const newResult: RenovationResult = {
                id: `res_${Date.now()}`,
                imageUrl,
                sourceImageUrl: sourceImageFile.url,
                prompt: finalPrompt,
                description: "", // Sẽ được cập nhật sau
                width: selectedAspectRatio.id === 'from_input' ? sourceImageFile.width : selectedAspectRatio.width,
                height: selectedAspectRatio.id === 'from_input' ? sourceImageFile.height : selectedAspectRatio.height,
            };
            
            // Thêm ảnh mới vào canvas chính (phiên hiện tại)
            setResults(prev => [newResult, ...prev]);
            setSelectedImage(newResult);
            
            // Save to gallery (sẽ tự động lưu vào file system)
            await saveToGallery(newResult);
            setGalleryRefreshTrigger(prev => prev + 1);
            console.log('✅ Image saved to gallery:', newResult.id);
            
            // Chỉ tạo description cho ảnh 3D ban đầu từ giao diện chính
            // KHÔNG tạo cho: customPrompt (góc nhìn khác) hoặc views2d (bản vẽ 2D)
            const shouldGenerateDescription = !customPrompt && activePanel !== 'views2d';
            
            if (shouldGenerateDescription) {
                // Tạo description ngắn (không chặn UI)
                generateShortDescription({
                    selectedStyle: selectedStyle.name,
                    selectedMaterials: selectedMaterials?.materials || [],
                    selectedElements: selectedElements.map(e => e.name),
                    selectedDramatization: selectedDramatization.map(d => d.name).join(', '),
                    prompt: mainPrompt
                }).then(async (description) => {
                    // Cập nhật description sau khi có
                    const updatedResult = { ...newResult, description };
                    setSelectedImage(updatedResult);
                    // Update in gallery
                    await saveToGallery(updatedResult);
                    setGalleryRefreshTrigger(prev => prev + 1);
                    console.log('✅ Description updated in gallery');
                }).catch(async (err) => {
                    console.error("Error generating description:", err);
                    // Fallback description
                    const fallbackDesc = `Phương án ${selectedStyle.name} cho Làng cổ Phong Nam, kết hợp ${selectedMaterials?.name || 'vật liệu truyền thống'}.`;
                    const updatedResult = { ...newResult, description: fallbackDesc };
                    setSelectedImage(updatedResult);
                    // Update in gallery
                    await saveToGallery(updatedResult);
                    setGalleryRefreshTrigger(prev => prev + 1);
                    console.log('✅ Fallback description updated in gallery');
                });
            }
        } catch (err: any) {
            setError(err.message || "An unknown error occurred during image generation.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleEdit = async (params: { prompt: string, maskImage: string }) => {
        if (!imageToEdit) {
            setError("An image must be selected for editing.");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const originalFile = (await dataUrlToImageFile(imageToEdit.imageUrl, "edit-base.png")).file;
            const { base64Image } = await editImage(params.prompt, originalFile, params.maskImage);
            const imageUrl = `data:image/png;base64,${base64Image}`;
            const newResult: RenovationResult = {
                id: `res_edit_${Date.now()}`,
                imageUrl,
                sourceImageUrl: imageToEdit.imageUrl,
                prompt: params.prompt,
                description: `Chỉnh sửa: ${params.prompt}`,
                width: imageToEdit.width,
                height: imageToEdit.height,
            };
            
            // Thêm ảnh đã chỉnh sửa vào canvas chính
            setResults(prev => [newResult, ...prev]);
            setSelectedImage(newResult);
            
            // Save to gallery
            await saveToGallery(newResult);
            setGalleryRefreshTrigger(prev => prev + 1);
            console.log('✅ Edited image saved to gallery:', newResult.id);
            
            // Save to gallery (sẽ tự động lưu vào file system)
            await saveToGallery(newResult);
            setGalleryRefreshTrigger(prev => prev + 1);
            console.log('✅ Edited image saved to gallery:', newResult.id);
            
            // Giữ ở chế độ editing, cập nhật ảnh đang chọn
            setImageToEdit(newResult);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred during image editing.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleImageSelectForEdit = (result: RenovationResult) => {
        setImageToEdit(result);
        setAppMode('editing');
    };
    
    const handleImageUploadForEdit = async (file: File) => {
        try {
            const processedFile = await processBaseImage(file);
            const tempResult: RenovationResult = {
                id: `custom_${Date.now()}`,
                imageUrl: processedFile.url,
                prompt: "Custom uploaded image",
                width: processedFile.width,
                height: processedFile.height,
            };
            setImageToEdit(tempResult);
            setAppMode('editing');
        } catch (err) {
            console.error(err);
            setError("Could not process the uploaded image for editing.");
        }
    };
    
    const handleImageZoom = (result: RenovationResult) => {
        const index = results.findIndex(r => r.id === result.id);
        if (index !== -1) {
            setLightboxIndex(index);
        }
    };

    const handleLightboxNavigate = (direction: 'next' | 'prev') => {
        if (lightboxIndex === null) return;
        const newIndex = direction === 'next'
            ? (lightboxIndex + 1) % results.length
            : (lightboxIndex - 1 + results.length) % results.length;
        setLightboxIndex(newIndex);
    };
    
    const handleNoteRequest = (result: RenovationResult) => {
        setLightboxIndex(null); // Close lightbox if open
        setImageToNote(result);
        setAppMode('noting');
    };

    const handleSaveNote = async (notedImageDataUrl: string) => {
        const newResult: RenovationResult = {
            id: `note_${Date.now()}`,
            imageUrl: notedImageDataUrl,
            sourceImageUrl: imageToNote?.imageUrl,
            prompt: "Annotated Image",
            description: "Image with notes and annotations.",
            width: imageToNote?.width ?? 1024,
            height: imageToNote?.height ?? 1024,
        };
        
        // Thêm ảnh có ghi chú vào canvas chính
        setResults(prev => [newResult, ...prev]);
        setSelectedImage(newResult);
        setAppMode('generate');
        setImageToNote(null);
        
        // Save to gallery
        // Save to gallery (sẽ tự động lưu vào file system)
        await saveToGallery(newResult);
        setGalleryRefreshTrigger(prev => prev + 1);
        console.log('✅ Note saved to gallery:', newResult.id);
    };
    
    const handleGallerySelectImage = (image: RenovationResult) => {
        setSelectedImage(image);
        setActivePanel('context');
    };
    
    const handleGalleryGenerateFromImage = async (image: RenovationResult) => {
        // Chỉ set ảnh và chuyển sang panel views2d để user chọn góc nhìn
        setSelectedImage(image);
        setActivePanel('views2d');
    };
    
    const handleGalleryGenerate2D = async (image: RenovationResult) => {
        // Chỉ set ảnh và chuyển sang panel views2d để user chọn loại bản vẽ 2D
        setSelectedImage(image);
        setActivePanel('views2d');
    };



    const renderActivePanel = () => {
        const hasReferenceImage = !!referenceImageFile;
        
        switch(activePanel) {
            case 'phongnam': return <PanelPhongNam darkMode={isDarkMode} />;
            case 'context': return <PanelImages baseImageUrl={baseImageFile?.url || null} referenceImageUrl={referenceImageFile?.url || null} onImageSelect={handleImageSelect} referenceStrength={referenceStrength} onReferenceStrengthChange={setReferenceStrength} inputFidelity={inputFidelity} onInputFidelityChange={setInputFidelity} mainPrompt={mainPrompt} onMainPromptChange={setMainPrompt} />;
            case 'angleGeneration': return <PanelAngleGeneration 
                currentImage={selectedImage} 
                galleryImages={results} 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                canGenerate={canGenerate}
                onImageSelect={setSelectedImage}
                onImageUpload={async (file) => {
                    try {
                        const processedFile = await processBaseImage(file);
                        // Convert to RenovationResult format
                        const newResult: RenovationResult = {
                            id: `uploaded-${Date.now()}`,
                            imageUrl: processedFile.url,
                            prompt: 'Uploaded image',
                            width: processedFile.width,
                            height: processedFile.height,
                        };
                        setSelectedImage(newResult);
                    } catch (err) {
                        console.error('Error processing uploaded image:', err);
                        setError('Could not process the uploaded image.');
                    }
                }}
            />;
            case 'style': return <PanelStyle styles={[...ARCHITECTURAL_STYLES, ...INTERIOR_STYLES]} selectedStyle={selectedStyle.prompt} onStyleSelect={setSelectedStyle} hasReferenceImage={hasReferenceImage} />;
            case 'materials': return <PanelMaterials materialCategories={MATERIAL_COMBINATIONS} selectedCombination={selectedMaterials} onCombinationSelect={setSelectedMaterials} hasReferenceImage={hasReferenceImage} />;
            case 'elements': return <PanelDetails exteriorCategories={EXTERIOR_ARCHITECTURAL_DETAILS} interiorCategories={INTERIOR_ARCHITECTURAL_DETAILS} selectedElements={selectedElements} onSelectionChange={setSelectedElements} hasReferenceImage={hasReferenceImage} />;
            case 'dramatization': return <PanelDramatization dramatizationCategories={DRAMATIZATION_OPTIONS} selectedOptions={selectedDramatization} onSelectionChange={setSelectedDramatization} hasReferenceImage={hasReferenceImage} />;
            case 'aspectRatio': return <PanelAspectRatio aspectRatioOptions={ASPECT_RATIO_OPTIONS} selectedAspectRatio={selectedAspectRatio} onAspectRatioSelect={setSelectedAspectRatio} baseImage={baseImageFile} />;
            case 'views2d': return <Panel2DViews 
                viewOptions={VIEW_2D_OPTIONS} 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                canGenerate={canGenerate}
                currentImage={selectedImage}
                galleryImages={results}
                onImageSelect={setSelectedImage}
                onImageUpload={async (file) => {
                    try {
                        const processedFile = await processBaseImage(file);
                        const newResult: RenovationResult = {
                            id: `uploaded-${Date.now()}`,
                            imageUrl: processedFile.url,
                            prompt: 'Uploaded image for 2D view',
                            width: processedFile.width,
                            height: processedFile.height,
                        };
                        setSelectedImage(newResult);
                    } catch (err) {
                        console.error('Error processing uploaded image:', err);
                        setError('Could not process the uploaded image.');
                    }
                }}
            />;
            case 'gallery': return <PanelGallery 
                key={`gallery-${results.length}`}
                refreshTrigger={galleryRefreshTrigger}
                onSelectImage={handleGallerySelectImage} 
                onEditImage={handleImageSelectForEdit} 
                onViewImage={handleImageZoom} 
                onGenerateFromImage={handleGalleryGenerateFromImage}
                onNoteImage={handleNoteRequest}
                onGenerateAngle={handleGalleryGenerateFromImage}
                onGenerate2D={handleGalleryGenerate2D}
            />;
            default: return null;
        }
    };
    
    // Show Welcome Screen if not authenticated
    if (!isAuthenticated) {
        return <WelcomeScreen onLogin={handleLogin} />;
    }
    
    if (appMode === 'editing' && imageToEdit) {
        return (
            <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 p-4">
                <EditCanvas 
                    baseImage={imageToEdit} 
                    results={results}
                    selectedImage={selectedImage}
                    onEdit={handleEdit} 
                    onCancel={() => {
                        setAppMode('generate');
                        setImageToEdit(null);
                    }}
                    onSelectImage={handleImageSelectForEdit}
                    isLoading={isLoading}
                />
                {isLoading && <LoadingModal />}
            </div>
        );
    }
    
    if (appMode === 'noting' && imageToNote) {
        return <NoteEditor imageToNote={imageToNote} onSave={handleSaveNote} onExit={() => { setAppMode('generate'); setImageToNote(null); }} />;
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden">
            <div className="hidden lg:block flex-shrink-0">
              <Header 
                activePanel={activePanel} 
                onPanelChange={setActivePanel} 
                appMode={appMode} 
                setAppMode={setAppMode} 
                onGenerate={() => handleGenerate()} 
                isLoading={isLoading} 
                canGenerate={canGenerate}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </div>

            <main className="flex-grow flex lg:p-2 gap-0 lg:gap-2 overflow-hidden">
                {/* Left Panel - Dynamic Content - Desktop only */}
                <CollapsiblePanel
                  position="left"
                  isCollapsed={isLeftPanelCollapsed}
                  onToggle={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
                  title="Bảng điều khiển"
                  className="hidden lg:flex"
                >
                  {renderActivePanel()}
                </CollapsiblePanel>
                
                {/* Center Canvas - Full width on mobile, compact on desktop */}
                <div className="flex-grow flex flex-col gap-0 lg:gap-2 min-w-0 w-full lg:order-2">
                    {/* Mobile Header - Simple */}
                    <div className="lg:hidden flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                        <div>
                          <h1 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                            Làng Phong Nam
                          </h1>
                          <p className="text-[10px] text-gray-600 dark:text-gray-400">
                            Trại Sáng tác 2025
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Theme Toggle */}
                        <button
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-xl"
                        >
                          {isDarkMode ? '🌙' : '☀️'}
                        </button>
                        
                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Main Display Area - Mobile: Account for bottom toolbar */}
                    <div className="flex-grow min-h-0 overflow-auto pb-20 lg:pb-0">
                      {/* Mobile Gallery View */}
                      {activePanel === 'gallery' ? (
                        <div className="lg:hidden h-full">
                          <PanelGallery 
                            refreshTrigger={galleryRefreshTrigger}
                            onSelectImage={handleGallerySelectImage} 
                            onEditImage={handleImageSelectForEdit} 
                            onViewImage={handleImageZoom} 
                            onGenerateFromImage={handleGalleryGenerateFromImage}
                            onNoteImage={handleNoteRequest}
                            onGenerateAngle={handleGalleryGenerateFromImage}
                            onGenerate2D={handleGalleryGenerate2D}
                          />
                        </div>
                      ) : (
                        <ResultDisplay 
                          isLoading={isLoading && results.length === 0}
                          error={error}
                          results={results}
                          appMode={appMode}
                          onImageSelectForEdit={handleImageSelectForEdit}
                          selectedImage={selectedImage}
                          onSelectImage={setSelectedImage}
                          onImageZoom={handleImageZoom}
                          onImageUploadForEdit={handleImageUploadForEdit}
                          selectedStyle={selectedStyle}
                          selectedMaterials={selectedMaterials}
                          selectedElements={selectedElements}
                          selectedDramatization={selectedDramatization}
                          baseImageUrl={baseImageFile?.url}
                          referenceImageUrl={referenceImageFile?.url}
                          mainPrompt={mainPrompt}
                        />
                      )}
                    </div>
                </div>

                {/* Right Panel - Collapsible - Desktop only */}
                <CollapsiblePanel
                  position="right"
                  isCollapsed={isRightPanelCollapsed}
                  onToggle={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  title="Thông tin & Hành động"
                  className="hidden lg:flex"
                >
                  <InfoPanel 
                    selectedImage={selectedImage} 
                    onGenerateAngle={(prompt) => handleGenerate(prompt)} 
                    isLoading={isLoading} 
                    selectedStyle={selectedStyle}
                    selectedMaterials={selectedMaterials}
                    selectedElements={selectedElements}
                    selectedDramatization={selectedDramatization}
                  />
                </CollapsiblePanel>
                
                <div className="lg:hidden">
                  <ControlBar 
                    activePanel={activePanel} 
                    onPanelChange={setActivePanel} 
                    appMode={appMode} 
                    setAppMode={setAppMode} 
                    onGenerate={() => handleGenerate()} 
                    isLoading={isLoading} 
                    canGenerate={canGenerate}
                    renderActivePanel={renderActivePanel}
                  />
                </div>
            </main>
            
            <LoadingModal isOpen={isLoading} />
            
            {lightboxIndex !== null && (
                <Lightbox 
                    results={results}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNavigate={handleLightboxNavigate}
                    onEdit={(res) => { setLightboxIndex(null); handleImageSelectForEdit(res); }}
                    onNote={handleNoteRequest}
                />
            )}
        </div>
    );
}

export default App;