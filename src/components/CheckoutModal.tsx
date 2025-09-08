'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { CheckoutFormData } from '@/types/product';
import { SuccessModal } from './SuccessModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedPaymentMethod: '6' | '12' | 'full';
}

export function CheckoutModal({ isOpen, onClose, product, selectedPaymentMethod }: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    phoneNumber: '',
    fullName: '',
    username: '',
    region: '',
    city: '',
    paymentMethod: selectedPaymentMethod,
    productId: product.id
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });

  const regions = [
    'Toshkent shahri',
    'Toshkent viloyati',
    'Andijon viloyati',
    'Buxoro viloyati',
    'Farg\'ona viloyati',
    'Jizzax viloyati',
    'Xorazm viloyati',
    'Namangan viloyati',
    'Navoiy viloyati',
    'Qashqadaryo viloyati',
    'Qoraqalpog\'iston Respublikasi',
    'Samarqand viloyati',
    'Sirdaryo viloyati',
    'Surxondaryo viloyati'
  ];

  const cities = {
    'Toshkent shahri': ['Toshkent shahri'],
    'Toshkent viloyati': ['Angren', 'Bekobod', 'Chirchiq', 'Nurafshon', 'Olmaliq', 'Yangiyo\'l'],
    'Andijon viloyati': ['Andijon', 'Asaka', 'Baliqchi', 'Bo\'z', 'Buloqboshi', 'Izboskan', 'Jalaquduq', 'Qo\'rg\'ontepa', 'Marhamat', 'Oltinko\'l', 'Pakhtaobod', 'Paxtaobod', 'Shahrixon', 'Ulug\'nor', 'Xonobod'],
    'Buxoro viloyati': ['Buxoro', 'Vobkent', 'G\'ijduvon', 'Jondor', 'Kogon', 'Olot', 'Peshku', 'Qorako\'l', 'Qorovulbozor', 'Romitan', 'Shofirkon'],
    'Farg\'ona viloyati': ['Farg\'ona', 'Beshariq', 'Bog\'dod', 'Buvayda', 'Dang\'ara', 'Furqat', 'Qo\'qon', 'Qo\'shtepa', 'Rishton', 'So\'x', 'Toshloq', 'Uchko\'prik', 'Yozyovon'],
    'Jizzax viloyati': ['Jizzax', 'Arnasoy', 'Baxmal', 'Do\'stlik', 'Forish', 'G\'allaorol', 'Mirzacho\'l', 'Paxtakor', 'Yangiobod', 'Zomin', 'Zafarobod', 'Zarbdor'],
    'Xorazm viloyati': ['Urganch', 'Bog\'ot', 'Gurlan', 'Qo\'shko\'pir', 'Shovot', 'Tuproqqal\'a', 'Xazorasp', 'Xiva', 'Yangiariq', 'Yangibozor'],
    'Namangan viloyati': ['Namangan', 'Chortoq', 'Chust', 'Kosonsoy', 'Mingbuloq', 'Norin', 'Pop', 'To\'raqo\'rg\'on', 'Uchqo\'rg\'on', 'Uychi', 'Yangiqo\'rg\'on'],
    'Navoiy viloyati': ['Navoiy', 'Karmana', 'Konimex', 'Nurota', 'Qiziltepa', 'Tomdi', 'Uchquduq', 'Xatirchi', 'Zarafshon'],
    'Qashqadaryo viloyati': ['Qarshi', 'Chiroqchi', 'Dehqonobod', 'G\'uzor', 'Kasbi', 'Kitob', 'Koson', 'Mirishkor', 'Muborak', 'Nishon', 'Qamashi', 'Shahrisabz', 'Yakkabog\''],
    'Qoraqalpog\'iston Respublikasi': ['Nukus', 'Amudaryo', 'Beruniy', 'Chimboy', 'Ellikqal\'a', 'Kegayli', 'Mo\'ynoq', 'Nukus', 'Qonliko\'l', 'Qorao\'zak', 'Shumanay', 'Taxtako\'pir', 'To\'rtko\'l', 'Xo\'jayli'],
    'Samarqand viloyati': ['Samarqand', 'Bulung\'ur', 'Ishtixon', 'Jomboy', 'Kattaqo\'rg\'on', 'Narpay', 'Nurobod', 'Oqdaryo', 'Paxtachi', 'Payariq', 'Pastdarg\'om', 'Qo\'shrabot', 'Tayloq', 'Urgut'],
    'Sirdaryo viloyati': ['Guliston', 'Boyovut', 'Guliston', 'Mirzaobod', 'Oqoltin', 'Sayxunobod', 'Sardoba', 'Sirdaryo', 'Xovos'],
    'Surxondaryo viloyati': ['Termiz', 'Angor', 'Bandixon', 'Boysun', 'Denov', 'Jarqo\'rg\'on', 'Qiziriq', 'Qumqo\'rg\'on', 'Muzrabod', 'Oltinsoy', 'Sariosiyo', 'Sherobod', 'Sho\'rchi', 'Termiz', 'Uzun']
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    let processedValue = value;
    
    // Telefon raqami uchun maxsus ishlov berish
    if (field === 'phoneNumber') {
      // Faqat raqamlarni qoldirish
      processedValue = value.replace(/[^\d]/g, '');
      
      // Agar 9 ta raqamdan kam bo'lsa, to'ldirish
      if (processedValue.length > 9) {
        processedValue = processedValue.substring(0, 9);
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Telefon raqam kiritilishi shart';
    } else {
      // Telefon raqamini validatsiya qilish
      const phoneRegex = /^[0-9]{9}$/;
      
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak';
      }
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ism va familiya kiritilishi shart';
    }

    if (!formData.region) {
      newErrors.region = 'Viloyat tanlanishi shart';
    }

    if (!formData.city) {
      newErrors.city = 'Shahar/tuman tanlanishi shart';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage({
          title: "Buyurtma muvaffaqiyatli yuborildi!",
          message: "Tez orada siz bilan bog'lanamiz."
        });
        setShowSuccessModal(true);
        setFormData({
          phoneNumber: '',
          fullName: '',
          username: '',
          region: '',
          city: '',
          paymentMethod: selectedPaymentMethod,
          productId: product.id
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      setSuccessMessage({
        title: "Xatolik yuz berdi",
        message: "Iltimos, qaytadan urinib ko'ring."
      });
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="md:text-xl text-[18px] font-semibold text-gray-900">Rasmiylashtirish</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:p-6 p-4 space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon raqam <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="flex items-center px-3 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50">
                <span className="text-sm text-gray-500">🇺🇿 +998</span>
              </div>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="901234567"
                maxLength={9}
                className={`md:text-base text-[14px] flex-1 px-3 py-2 border rounded-r-lg text-gray-800 focus:ring-1 focus:ring-[#d5ac52] focus:border-[#d5ac52] focus:outline-none ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ism va familiyangiz <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Ismingizni kiriting"
              className={`md:text-base text-[14px] w-full px-3 py-2 border rounded-lg text-gray-800 focus:ring-1 focus:ring-[#d5ac52] focus:border-[#d5ac52] focus:outline-none ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Viloyatni tanlang <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.region}
              onChange={(e) => {
                handleInputChange('region', e.target.value);
                handleInputChange('city', ''); // Reset city when region changes
              }}
              className={`md:text-base text-[14px] w-full px-3 py-2 border rounded-lg text-gray-800 focus:ring-1 focus:ring-[#d5ac52] focus:border-[#d5ac52] focus:outline-none ${
                errors.region ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Tanlang</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">{errors.region}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shahar/tumanni tanlang <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!formData.region}
              className={`md:text-base text-[14px] w-full px-3 py-2 border rounded-lg text-gray-800 focus:ring-1 focus:ring-[#d5ac52] focus:border-[#d5ac52] focus:outline-none ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              } ${!formData.region ? 'bg-gray-100 text-gray-500' : ''}`}
            >
              <option value="">Tanlang</option>
              {formData.region && cities[formData.region as keyof typeof cities]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="md:text-base text-[14px] flex-1 px-3 md:py-2 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:text-base text-[14px] flex-1 px-3 md:py-2 py-1.5 bg-[#d5ac52] hover:bg-[#c19a47] disabled:bg-[#b89a3f] text-white font-medium rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Yuborilmoqda...' : 'Buyurtma berish'}
            </button>
          </div>
        </form>
      </div>

      {/* Success/Error Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        title={successMessage.title}
        message={successMessage.message}
        type={successMessage.title.includes('Xatolik') ? 'error' : 'success'}
      />
    </div>
  );
}
