'use client';

import { useState } from 'react';

interface ProductDescriptionProps {
  description: string;
  features: string[];
}

export function ProductDescription({ description, features }: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'description'>('description');

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('features')}
            className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'features'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mahsulot xususiyatlari
          </button>
          <button
            onClick={() => setActiveTab('description')}
            className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'description'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tavsif
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:text-base text-sm">
        {activeTab === 'features' ? (
          <div className="space-y-4">
            <h3 className="md:text-lg text-base font-semibold text-gray-900 mb-4">Mahsulot xususiyatlari</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="md:text-lg text-base font-semibold text-gray-900 mb-4">Tavsif</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
