import React from 'react';
import { NoteTool } from '../../types';
import { IconSelect, IconMarker, IconText, IconCrop } from '../icons';

interface NoteToolbarProps {
    activeTool: NoteTool;
    onToolSelect: (tool: NoteTool) => void;
}

const NoteToolbar: React.FC<NoteToolbarProps> = ({ activeTool, onToolSelect }) => {
    
    const tools = [
        { id: 'select', icon: IconSelect, label: 'Điều chỉnh' },
        { id: 'marker', icon: IconMarker, label: 'Thêm Ghi chú' },
        { id: 'text', icon: IconText, label: 'Thêm Văn bản' },
        { id: 'crop', icon: IconCrop, label: 'Cắt ảnh' },
    ];
    
    return (
        <div className="bg-gray-700 p-1 rounded-xl shadow-lg border border-gray-600 flex flex-row gap-1 z-10">
            {tools.map(tool => (
                 <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id as NoteTool)}
                    className={`p-2.5 rounded-lg transition-colors ${activeTool === tool.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-600 hover:text-white'}`}
                    title={tool.label}
                >
                    <tool.icon className="w-5 h-5" />
                </button>
            ))}
        </div>
    );
};

export default NoteToolbar;