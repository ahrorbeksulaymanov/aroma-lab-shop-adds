'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { Header } from '@/components/Header';
import { useState } from 'react';

export default function Home() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#d5ac52] to-[#c19a47] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Atirlar
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Dunyoning eng mashhur brendlarining hashamatli atirlari
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-[#d5ac52] font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Mahsulotlarni ko'rish
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Eng mashhur mahsulotlar</h2>
          <p className="text-gray-600">Mijozlarimiz tomonidan eng ko'p tanlangan atirlar</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
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
                  className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                  <svg 
                    className={`w-3.5 h-3.5 transition-colors ${
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
                  <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Yangi
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#d5ac52] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                
                <div className="mb-3">
                  <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-red-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
                
                <button className="w-full bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg">
                  Xarid qilish
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-[#d5ac52] hover:bg-[#c19a47] text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Barcha mahsulotlarni ko'rish
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 AromaLab Shop. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
