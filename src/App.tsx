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
import { PanelAspectRatio } from './components/panels/PanelAspectRatio';
import { PanelDetails } from './components/panels/PanelDetails';
import { PanelDramatization } from './components/panels/PanelDramatization';
import { PanelFloorPlan } from './components/panels/PanelFloorPlan';
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
import { saveImageToLocalDirectory } from './services/fileSystemService';
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
            setResults(prev => [newResult, ...prev]);
            setSelectedImage(newResult);
            
            // Lưu vào Gallery
            saveToGallery(newResult);
            
            // Lưu vào thư mục local nếu đã chọn
            try {
                await saveImageToLocalDirectory(imageUrl, `generated_${newResult.id}.png`);
            } catch (localErr) {
                console.warn('Could not save to local directory:', localErr);
            }
            
            // Tạo description ngắn (không chặn UI)
            generateShortDescription({
                selectedStyle: selectedStyle.name,
                selectedMaterials: selectedMaterials?.materials || [],
                selectedElements: selectedElements.map(e => e.name),
                selectedDramatization: selectedDramatization.map(d => d.name).join(', '),
                prompt: mainPrompt
            }).then(description => {
                // Cập nhật description sau khi có
                const updatedResult = { ...newResult, description };
                setResults(prev => prev.map(r => r.id === newResult.id ? updatedResult : r));
                setSelectedImage(updatedResult);
                // Cập nhật gallery với description mới
                saveToGallery(updatedResult);
            }).catch(err => {
                console.error("Error generating description:", err);
                // Fallback description
                const fallbackDesc = `Phương án ${selectedStyle.name} cho Làng cổ Phong Nam, kết hợp ${selectedMaterials?.name || 'vật liệu truyền thống'}.`;
                const updatedResult = { ...newResult, description: fallbackDesc };
                setResults(prev => prev.map(r => r.id === newResult.id ? updatedResult : r));
                setSelectedImage(updatedResult);
                // Cập nhật gallery với description mới
                saveToGallery(updatedResult);
            });
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
            setResults(prev => [newResult, ...prev]);
            setSelectedImage(newResult);
            
            // Lưu vào Gallery
            saveToGallery(newResult);
            
            // Lưu vào thư mục local nếu đã chọn
            try {
                await saveImageToLocalDirectory(imageUrl, `edit_${newResult.id}.png`);
            } catch (localErr) {
                console.warn('Could not save to local directory:', localErr);
                // Không hiển thị lỗi vì ảnh đã được lưu vào gallery
            }
            
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
        setResults(prev => [newResult, ...prev]);
        setSelectedImage(newResult);
        setAppMode('generate');
        setImageToNote(null);
        
        // Lưu vào Gallery
        saveToGallery(newResult);
        
        // Lưu vào thư mục local nếu đã chọn
        try {
            await saveImageToLocalDirectory(notedImageDataUrl, `note_${newResult.id}.png`);
        } catch (localErr) {
            console.warn('Could not save to local directory:', localErr);
        }
    };
    
    const handleGallerySelectImage = (image: RenovationResult) => {
        setSelectedImage(image);
        setActivePanel('context');
    };
    
    const handleGalleryGenerateFromImage = async (image: RenovationResult) => {
        try {
            const imageFile = await dataUrlToImageFile(image.imageUrl, `gallery-${image.id}.png`);
            setBaseImageFile(imageFile);
            setSelectedImage(image);
            setActivePanel('views2d');
        } catch (err) {
            console.error('Error loading image from gallery:', err);
            setError('Không thể tải ảnh từ thư viện');
        }
    };
    
    const handleGalleryGenerate2D = async (image: RenovationResult) => {
        try {
            const imageFile = await dataUrlToImageFile(image.imageUrl, `gallery-${image.id}.png`);
            setBaseImageFile(imageFile);
            setSelectedImage(image);
            setActivePanel('views2d');
        } catch (err) {
            console.error('Error loading image from gallery:', err);
            setError('Không thể tải ảnh từ thư viện');
        }
    };

    const renderActivePanel = () => {
        const hasReferenceImage = !!referenceImageFile;
        
        switch(activePanel) {
            case 'phongnam': return <PanelPhongNam darkMode={isDarkMode} />;
            case 'context': return <PanelImages baseImageUrl={baseImageFile?.url || null} referenceImageUrl={referenceImageFile?.url || null} onImageSelect={handleImageSelect} referenceStrength={referenceStrength} onReferenceStrengthChange={setReferenceStrength} inputFidelity={inputFidelity} onInputFidelityChange={setInputFidelity} mainPrompt={mainPrompt} onMainPromptChange={setMainPrompt} />;
            case 'category': return <PanelFloorPlan floorPlanImage={floorPlanImage} onFileSelect={handleImageSelect} conversionOptions={CONVERSION_OPTIONS} selectedConversionType={selectedConversionType} onConversionTypeChange={setSelectedConversionType} roomTypes={ROOM_TYPES} selectedRoomType={selectedRoomType} onRoomTypeChange={setSelectedRoomType} />;
            case 'style': return <PanelStyle styles={[...ARCHITECTURAL_STYLES, ...INTERIOR_STYLES]} selectedStyle={selectedStyle.prompt} onStyleSelect={setSelectedStyle} hasReferenceImage={hasReferenceImage} />;
            case 'materials': return <PanelMaterials materialCategories={MATERIAL_COMBINATIONS} selectedCombination={selectedMaterials} onCombinationSelect={setSelectedMaterials} hasReferenceImage={hasReferenceImage} />;
            case 'elements': return <PanelDetails exteriorCategories={EXTERIOR_ARCHITECTURAL_DETAILS} interiorCategories={INTERIOR_ARCHITECTURAL_DETAILS} selectedElements={selectedElements} onSelectionChange={setSelectedElements} hasReferenceImage={hasReferenceImage} />;
            case 'dramatization': return <PanelDramatization dramatizationCategories={DRAMATIZATION_OPTIONS} selectedOptions={selectedDramatization} onSelectionChange={setSelectedDramatization} hasReferenceImage={hasReferenceImage} />;
            case 'aspectRatio': return <PanelAspectRatio aspectRatioOptions={ASPECT_RATIO_OPTIONS} selectedAspectRatio={selectedAspectRatio} onAspectRatioSelect={setSelectedAspectRatio} baseImage={baseImageFile} />;
            case 'views2d': return <Panel2DViews viewOptions={VIEW_2D_OPTIONS} onGenerate={handleGenerate} isLoading={isLoading} canGenerate={canGenerate} />;
            case 'gallery': return <PanelGallery 
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
        <div className="h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
            <div className="hidden lg:block">
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

            <main className="flex-grow flex p-4 gap-4 overflow-hidden">
                {/* Left Panel - Collapsible */}
                <CollapsiblePanel
                  position="left"
                  isCollapsed={isLeftPanelCollapsed}
                  onToggle={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
                  title="Bảng điều khiển"
                >
                  <div className="hidden lg:block">
                    {renderActivePanel()}
                  </div>
                </CollapsiblePanel>
                
                {/* Center Canvas - Flexible */}
                <div className="flex-grow flex flex-col gap-4 min-w-0 order-2">
                    <div className="lg:hidden flex-shrink-0">
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
                    <div className="flex-grow min-h-0">
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
                      />
                    </div>
                </div>

                {/* Right Panel - Collapsible */}
                <CollapsiblePanel
                  position="right"
                  isCollapsed={isRightPanelCollapsed}
                  onToggle={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  title="Thông tin"
                >
                  <div className="hidden xl:block">
                    <InfoPanel 
                      selectedImage={selectedImage} 
                      onGenerateAngle={(prompt) => handleGenerate(prompt)} 
                      isLoading={isLoading} 
                      selectedStyle={selectedStyle}
                      selectedMaterials={selectedMaterials}
                      selectedElements={selectedElements}
                      selectedDramatization={selectedDramatization}
                    />
                  </div>
                </CollapsiblePanel>
                
                <div className="lg:hidden">
                  <ControlBar activePanel={activePanel} onPanelChange={setActivePanel} appMode={appMode} setAppMode={setAppMode} onGenerate={() => handleGenerate()} isLoading={isLoading} canGenerate={canGenerate} />
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