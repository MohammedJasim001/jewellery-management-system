import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70  bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
          Confirm Deletion
        </h2>
        <p className="text-gray-700 mb-6 text-center">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-white hover:bg-gray-400 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
