'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/data/products';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductDescription } from '@/components/ProductDescription';
import { RelatedProducts } from '@/components/RelatedProducts';
import { Header } from '@/components/Header';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'3' | '6' | '12' | 'full'>('3');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Mahsulot topilmadi</h1>
          <p className="text-gray-600">Kechirasiz, so'ralgan mahsulot mavjud emas.</p>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleShare = async () => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
    };

    const shareData = {
      title: `${product?.name} - AromaLab Shop`,
      text: `🛍️ ${product?.name}\n\n${product?.description}\n\n💰 Narx: ${formatPrice(product?.price || 0)}\n\n🔗 AromaLab Shop - Premium Atirlar`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed:', err);
        // Fallback to clipboard if share fails
        await copyToClipboard(shareData);
      }
    } else {
      // Fallback: copy to clipboard
      await copyToClipboard(shareData);
    }
  };

  const copyToClipboard = async (shareData: any) => {
    const shareText = `${shareData.title}\n\n${shareData.text}\n\n🔗 ${shareData.url}`;
    try {
      await navigator.clipboard.writeText(shareText);
      alert('✅ Mahsulot ma\'lumotlari clipboardga nusxalandi!\n\nTelegram, WhatsApp yoki boshqa ilovalarga yopishtiring.');
    } catch (err) {
      console.log('Clipboard failed:', err);
      // Final fallback - show share text in alert
      alert(`📋 Mahsulot ma'lumotlari:\n\n${shareText}`);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Product Title and Status */}
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 mb-4">{product.name}</h1>

        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productId={product.id} onShare={handleShare} />

          {/* Product Info */}
            <ProductInfo
              product={product}
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onCheckout={handleCheckout}
              onShare={handleShare}
            />
        </div>

        {/* Product Description */}
        <ProductDescription 
          description={product.description}
          features={product.features}
        />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        product={product}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </div>
  );
}
