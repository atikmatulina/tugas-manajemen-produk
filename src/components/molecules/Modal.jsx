function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer text-xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
