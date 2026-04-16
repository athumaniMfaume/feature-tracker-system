export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-5">

        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-lg text-gray-800">{title}</h2>

          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4">{children}</div>

      </div>

    </div>
  );
}