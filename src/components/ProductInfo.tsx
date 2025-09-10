'use client';

import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  selectedPaymentMethod: '3' | '6' | '12' | 'full';
  onPaymentMethodChange: (method: '3' | '6' | '12' | 'full') => void;
  onCheckout: () => void;
  onShare?: () => void;
}

export function ProductInfo({
  product,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onCheckout,
  onShare
}: ProductInfoProps) {
  const selectedOption = product.installmentOptions.find(option =>
    option.months.toString() === selectedPaymentMethod
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const getLastPaymentDate = (months: number) => {
    const date = new Date();
    // To'g'ri oy qo'shish uchun
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newMonth = currentMonth + months;
    const newYear = currentYear + Math.floor(newMonth / 12);
    const finalMonth = newMonth % 12;

    // Oxirgi oyning oxirgi kunini olish
    const lastDayOfMonth = new Date(newYear, finalMonth + 1, 0).getDate();
    const currentDay = date.getDate();

    // Agar joriy kun oxirgi kundan katta bo'lsa, oxirgi kunga o'rnatish
    const finalDay = Math.min(currentDay, lastDayOfMonth);

    const finalDate = new Date(newYear, finalMonth, finalDay);
    return finalDate.toLocaleDateString('uz-UZ');
  };

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="bg-white rounded-lg md:p-6 p-4 shadow-sm border">
        {/* Product Price */}
        <div className="mb-4">
          <p className="md:text-sm text-[12px] text-gray-600 mb-1">Mahsulot narxi:</p>
          <p className="md:text-2xl text-xl font-bold text-gray-900 mb-1">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="md:text-lg text-sm text-red-500 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Installment Overview */}
        <div className="mb-4">
          <p className="md:text-sm text-[12px] text-gray-600 mb-1">Muddatli to'lov:</p>
          <p className="md:text-xl text-[16px] font-bold text-gray-900">
            {selectedOption ? formatPrice(selectedOption.monthlyPayment) : formatPrice(product.price)} / {selectedPaymentMethod === 'full' ? '1' : selectedPaymentMethod} oy
          </p>
        </div>

        {/* Installment Options */}
        <div className="bg-gray-100 rounded-lg px-4 py-2 mb-4">
          <div className="flex sm:space-x-2">
            <button
              onClick={() => onPaymentMethodChange('3')}
              className={`sm:px-4 px-2 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer focus:outline-none border-[#d5ac52] ${selectedPaymentMethod === '3'
                  ? 'bg-white border border-[#d5ac52] border-solid text-gray-900'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent border-solid'
                }`}
            >
              3 oy
            </button>
            <button
              onClick={() => onPaymentMethodChange('6')}
              className={`sm:px-4 px-2 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer focus:outline-none border-[#d5ac52] ${selectedPaymentMethod === '6'
                  ? 'bg-white border border-[#d5ac52] border-solid text-gray-900'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent border-solid'
                }`}
            >
              6 oy
            </button>
            <button
              onClick={() => onPaymentMethodChange('12')}
              className={`sm:px-4 px-2 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer focus:outline-none border-[#d5ac52] ${selectedPaymentMethod === '12'
                  ? 'bg-white border border-[#d5ac52] text-gray-900'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent border-solid'
                }`}
            >
              12 oy
            </button>
            <button
              onClick={() => onPaymentMethodChange('full')}
              className={`sm:px-4 px-2 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer focus:outline-none border-[#d5ac52] ${selectedPaymentMethod === 'full'
                  ? 'bg-white border border-[#d5ac52] text-gray-900'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent border-solid'
                }`}
            >
              To'liq to'lov
            </button>
          </div>


        </div>

        {/* Selected Payment Plan Details */}
        {selectedOption && selectedPaymentMethod !== 'full' && (
          <div className="mt-4 bg-white rounded-lg border border-[#d5ac52] shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#d5ac52] rounded-full flex items-center justify-center">
                  <span className="md:text-xs text-[12px] font-bold text-white">PI</span>
                </div>
                <div className="text-[#d5ac52] font-bold md:text-lg text-[16px]">
                  {formatPrice(selectedOption.monthlyPayment)} x {selectedOption.months}
                </div>
              </div>
              <div className="w-6 h-6 bg-[#d5ac52] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Separator Line */}
            <div className="border-t border-gray-200"></div>

            {/* Details Section */}
            <div className="bg-white px-4 py-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 md:text-base text-sm">To'lov muddati</span>
                  <span className="font-semibold text-gray-900 md:text-base text-sm">{selectedOption.months} oy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 md:text-base text-sm">Oylik to'lov</span>
                  <span className="font-semibold text-gray-900 md:text-base text-sm">{formatPrice(selectedOption.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 md:text-base text-sm">To'lovning oxirgi sanasi</span>
                  <span className="font-semibold text-gray-900 md:text-base text-sm">{getLastPaymentDate(selectedOption.months)}</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex space-x-3 mt-6">
          <button
            onClick={onCheckout}
            className="lg:text-base md:text-[14px] text-[12px] flex-1 bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {
              selectedPaymentMethod !== 'full'
                ? 'Muddatli to\'lovga xarid qilish'
                : 'To\'liq to\'lovga xarid qilish'
            }
          </button>
          {onShare && (
            <button
              onClick={onShare}
              className="lg:text-base md:text-[14px] text-[12px] px-4 py-3 bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              title="Mahsulotni ulashish"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="hidden sm:inline">Ulashish</span>
            </button>
          )}
        </div>

        {/* Mobile Sticky Button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <button
            onClick={onCheckout}
            className="text-[14px] w-full bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold py-3 rounded-lg transition-all duration-200 cursor-pointer shadow-lg"
          >
            {
              selectedPaymentMethod !== 'full'
                ? 'Muddatli to\'lovga xarid qilish'
                : 'To\'liq to\'lovga xarid qilish'
            }
          </button>
        </div>
      </div>

      {/* Product Status & Guarantees */}
      <div className="bg-white rounded-lg md:p-6 p-4 shadow-sm border space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700 md:text-base text-sm">Mahsulot do'konda mavjud!</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className='text-blue-600' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          </div>
          <span className="text-gray-700 md:text-base text-sm">{product.delivery}</span>
        </div>
      </div>
    </div>
  );
}
