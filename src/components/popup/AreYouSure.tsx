import React from "react";

interface ConfirmPopupProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const AreYouSure: React.FC<ConfirmPopupProps> = ({
  visible,
  onConfirm,
  onCancel,
  message = "Bạn có chắc muốn thực hiện thao tác này?",
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center">
        <p className="mb-4 text-lg text-black">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Không
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
