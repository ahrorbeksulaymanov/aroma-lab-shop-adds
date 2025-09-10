'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const relatedProducts = products.filter(product => product.id !== currentProductId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sizni qiziqtirishi mumkin</h2>
      
      <div className="relative">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={true}
          navigation={true}
          className="related-products-swiper"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id} className="!w-64 h-full">
              <Link
                href={`/product/${product.id}`}
                className="h-full group bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow block flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.images[0] || '/images/louis-vuitton-myriad-1.webp'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                  <button 
                    onClick={(e) => toggleLike(product.id, e)}
                    className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
                  >
                    <svg 
                      className={`w-3 h-3 transition-colors ${
                        likedProducts.has(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600 hover:text-red-500'
                      }`} 
                      fill={likedProducts.has(product.id) ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      Yangi
                    </span>
                  )}
                </div>
                
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#d5ac52] transition-colors text-sm h-10 flex items-center">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="mb-2">
                      <p className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-red-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                    
                    <button className="w-full bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg text-xs">
                      Xarid qilish
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
