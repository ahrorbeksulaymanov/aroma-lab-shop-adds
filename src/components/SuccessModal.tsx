'use client';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: 'success' | 'error';
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Buyurtma muvaffaqiyatli yuborildi!",
  message = "Tez orada siz bilan bog'lanamiz.",
  type = 'success'
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {type === 'success' ? (
            <svg 
              className="h-8 w-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          ) : (
            <svg 
              className="h-8 w-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className={`md:text-base text-[14px] w-full font-semibold md:py-2.5 py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl ${
            type === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Tushunarli
        </button>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            type === 'success' ? 'bg-green-400' : 'bg-red-400'
          }`}></div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`w-1 h-1 rounded-full animate-pulse delay-100 ${
            type === 'success' ? 'bg-green-300' : 'bg-red-300'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
