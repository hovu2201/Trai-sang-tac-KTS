import React, { useState } from 'react';
import { EditTool } from '../types';
import { IconBrush, IconRectangle, IconEllipse, IconPolygon, IconRemove, IconChange } from './icons';

interface EditPanelProps {
    onEdit: (prompt: string, replacementImage?: string | null) => void;
    onCancel: () => void;
    activeTool: EditTool;
    onToolChange: (tool: EditTool) => void;
    brushSize: number;
    onBrushSizeChange: (size: number) => void;
    editMode: 'remove' | 'replace';
    onEditModeChange: (mode: 'remove' | 'replace') => void;
}

const ToolButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => (
    <button
        onClick={onClick}
        title={label}
        className={`flex-1 flex flex-col items-center p-2 rounded-lg transition-colors text-xs space-y-1 ${isActive
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
    >
        {children}
        <span className="font-semibold">{label}</span>
    </button>
);


const EditPanel: React.FC<EditPanelProps> = ({
    onEdit,
    onCancel,
    activeTool,
    onToolChange,
    brushSize,
    onBrushSizeChange,
    editMode,
    onEditModeChange
}) => {
    const [prompt, setPrompt] = useState('');

    const TOOLS: { id: EditTool, label: string, icon: React.FC<any> }[] = [
        { id: 'brush', label: 'Cọ vẽ', icon: IconBrush },
        { id: 'rectangle', label: 'Chữ nhật', icon: IconRectangle },
        { id: 'ellipse', label: 'Ellipse', icon: IconEllipse },
        { id: 'polygon', label: 'Đa giác', icon: IconPolygon },
    ];

    const handleSubmit = () => {
        if (!prompt.trim()) {
            alert("Vui lòng nhập mô tả cho phần chỉnh sửa.");
            return;
        }
        onEdit(prompt);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-3 mb-4">
                Chỉnh sửa ảnh
            </h2>

            <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">1. Chọn công cụ để tạo vùng chọn</label>
                    <div className="flex space-x-2 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-xl">
                        {TOOLS.map(tool => (
                            <ToolButton
                                key={tool.id}
                                label={tool.label}
                                isActive={activeTool === tool.id}
                                onClick={() => onToolChange(tool.id)}
                            >
                                <tool.icon className="w-6 h-6" />
                            </ToolButton>
                        ))}
                    </div>
                </div>

                {activeTool === 'brush' && (
                    <div>
                        <label htmlFor="brush-size" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Kích thước cọ vẽ: {brushSize}px
                        </label>
                        <input
                            id="brush-size"
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={brushSize}
                            onChange={(e) => onBrushSizeChange(parseInt(e.target.value, 10))}
                            className="w-full"
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">2. Chọn hành động</label>
                     <div className="flex space-x-2 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-xl">
                        <ToolButton
                            label="Xóa bỏ"
                            isActive={editMode === 'remove'}
                            onClick={() => onEditModeChange('remove')}
                        >
                            <IconRemove className="w-6 h-6" />
                        </ToolButton>
                         <ToolButton
                            label="Thay thế"
                            isActive={editMode === 'replace'}
                            onClick={() => onEditModeChange('replace')}
                        >
                            <IconChange className="w-6 h-6" />
                        </ToolButton>
                    </div>
                </div>


                <div>
                    <label htmlFor="edit-prompt" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        3. Mô tả sự thay đổi
                    </label>
                    <textarea
                        id="edit-prompt"
                        rows={4}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"
                        placeholder={
                            editMode === 'remove'
                                ? "Ví dụ: xóa cái cây ở giữa, loại bỏ người đi đường..."
                                : "Ví dụ: thay bằng một cửa sổ kính lớn, thêm một ban công nhỏ..."
                        }
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-shrink-0 pt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-3">
                <button
                    onClick={onCancel}
                    className="w-1/3 py-2 text-center text-sm font-bold bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-2/3 py-2 text-center text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400"
                    disabled={!prompt.trim()}
                >
                    Thực hiện
                </button>
            </div>
        </div>
    );
};

export default EditPanel;
