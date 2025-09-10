'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface ProductGalleryProps {
  images: string[];
  productId: string;
  onShare?: () => void;
}

export function ProductGallery({ images, productId, onShare }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Swiper */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          loop={true}
          loopAdditionalSlides={2}
          className="w-full"
          style={{ height: 'auto', minHeight: '400px' }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-full">
              <div className="relative w-full">
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Action buttons */}
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <button 
            onClick={toggleLike}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            <svg 
              className={`w-4 h-4 transition-colors ${
                isLiked 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-600 hover:text-red-500'
              }`} 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button onClick={onShare} className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer">
            <svg className="w-4 h-4 text-gray-600 hover:text-[#d5ac52] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnail Gallery */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={4}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          loop={true}
          loopAdditionalSlides={2}
          className="thumbnail-swiper"
        >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#d5ac52] transition-all duration-200 cursor-pointer">
              <Image
                src={image || '/images/louis-vuitton-myriad-1.webp'}
                alt={`Product view ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
