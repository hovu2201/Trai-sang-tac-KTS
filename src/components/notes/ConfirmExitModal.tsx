import React from 'react';

interface ConfirmExitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmExitModal: React.FC<ConfirmExitModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-white border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-2">Xác nhận thoát</h3>
        <p className="text-gray-300 mb-6">Bạn có chắc chắn muốn thoát? Mọi thay đổi chưa lưu sẽ bị mất.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 text-sm font-semibold bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmExitModal;
