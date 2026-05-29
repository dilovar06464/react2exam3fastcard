import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ProductSidebarProps {
  categories: any[];
  brands: any[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeatures: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  minPriceInput: string;
  setMinPriceInput: (val: string) => void;
  maxPriceInput: string;
  setMaxPriceInput: (val: string) => void;
  applyPriceRange: () => void;
  selectedCondition: string;
  setSelectedCondition: (val: string) => void;
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
  MOCK_FEATURES: string[];
  MOCK_CONDITIONS: string[];
  toggleArrayItem: (arr: any[], item: any, setFn: any) => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  brands,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  selectedFeatures,
  setSelectedFeatures,
  minPriceInput,
  setMinPriceInput,
  maxPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  selectedCondition,
  setSelectedCondition,
  selectedRatings,
  setSelectedRatings,
  MOCK_FEATURES,
  MOCK_CONDITIONS,
  toggleArrayItem
}) => {
  const { t } = useTranslation()

  // Sidebar Collapse States
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isBrandOpen, setIsBrandOpen] = useState(true)
  const [isFeatureOpen, setIsFeatureOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isConditionOpen, setIsConditionOpen] = useState(true)
  const [isRatingOpen, setIsRatingOpen] = useState(true)

  const [showAllBrands, setShowAllBrands] = useState(false)

  // Combine mock brands with API brands and make unique
  const allBrandNames = Array.from(new Set([
    "Apple", "Samsung", "Nike", "Adidas", "Sony",
    ...(brands || []).map(b => b.brandName).filter(Boolean)
  ]));
  
  const displayedBrands = showAllBrands ? allBrandNames : allBrandNames.slice(0, 5);

  return (
    <div className="w-full lg:w-[250px] flex-shrink-0 flex flex-col gap-6">
      
      {/* Category */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          <h3 className="font-medium">{t('products.category', 'Category')}</h3>
          {isCategoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col gap-3 text-sm">
            <span 
              onClick={() => setSelectedCategory("All products")}
              className={`cursor-pointer ${selectedCategory === "All products" ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
            >
              {t('products.all_products', 'All products')}
            </span>
            {categories.map((c: any) => (
              <span 
                key={c.id}
                onClick={() => setSelectedCategory(c.categoryName)}
                className={`cursor-pointer ${selectedCategory === c.categoryName ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                {t(`categories.${c.categoryName}`, c.categoryName)}
              </span>
            ))}
            <span className="text-red-500 cursor-pointer mt-1">{t('products.see_all', 'See all')}</span>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsBrandOpen(!isBrandOpen)}>
          <h3 className="font-medium">{t('products.brands', 'Brands')}</h3>
          {isBrandOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isBrandOpen && (
          <div className="flex flex-col gap-3 text-sm">
            {displayedBrands.map((b: string) => (
              <label key={b} className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-red-500 cursor-pointer border-gray-300 dark:border-gray-600 rounded dark:bg-slate-800"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleArrayItem(selectedBrands, b, setSelectedBrands)}
                />
                {b}
              </label>
            ))}
            {!showAllBrands && allBrandNames.length > 5 && (
              <span 
                className="text-red-500 cursor-pointer mt-1" 
                onClick={() => setShowAllBrands(true)}
              >
                {t('products.see_all', 'See all')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsFeatureOpen(!isFeatureOpen)}>
          <h3 className="font-medium">{t('products.features', 'Features')}</h3>
          {isFeatureOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isFeatureOpen && (
          <div className="flex flex-col gap-3 text-sm">
            {MOCK_FEATURES.map((f) => (
              <label key={f} className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-red-500 cursor-pointer border-gray-300 dark:border-gray-600 rounded dark:bg-slate-800"
                  checked={selectedFeatures.includes(f)}
                  onChange={() => toggleArrayItem(selectedFeatures, f, setSelectedFeatures)}
                />
                {t(`features.${f}`, f)}
              </label>
            ))}
            <span className="text-red-500 cursor-pointer mt-1">{t('products.see_all', 'See all')}</span>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsPriceOpen(!isPriceOpen)}>
          <h3 className="font-medium">{t('products.price_range', 'Price range')}</h3>
          {isPriceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isPriceOpen && (
          <div className="flex flex-col gap-4">
            {/* Functional dual slider */}
            <div className="w-full h-1 bg-gray-200 rounded relative mt-4 mb-4">
              <div 
                className="absolute h-full bg-red-400 rounded" 
                style={{ 
                  left: `${Math.min(100, Math.max(0, (Number(minPriceInput || 0) / 10000) * 100))}%`, 
                  right: `${100 - Math.min(100, Math.max(0, (Number(maxPriceInput || 10000) / 10000) * 100))}%` 
                }}
              ></div>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                value={minPriceInput || 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const maxVal = Number(maxPriceInput || 10000);
                  if (val <= maxVal) setMinPriceInput(val.toString());
                }}
                className="absolute w-full -top-1.5 h-4 bg-transparent pointer-events-none cursor-pointer range-slider-thumb"
                style={{ zIndex: 3, WebkitAppearance: 'none' }}
              />
              <input 
                type="range" 
                min="0" 
                max="10000" 
                value={maxPriceInput || 10000}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const minVal = Number(minPriceInput || 0);
                  if (val >= minVal) setMaxPriceInput(val.toString());
                }}
                className="absolute w-full -top-1.5 h-4 bg-transparent pointer-events-none cursor-pointer range-slider-thumb"
                style={{ zIndex: 4, WebkitAppearance: 'none' }}
              />
            </div>
            
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex flex-col">
                <span className="text-gray-400 mb-1">{t('products.min', 'Min')}</span>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="w-full h-8 border border-gray-300 dark:border-gray-700 rounded px-2 outline-none focus:border-red-400 bg-transparent text-black dark:text-white"
                />
              </div>
              <span className="mt-4 text-gray-400">-</span>
              <div className="flex flex-col">
                <span className="text-gray-400 mb-1">{t('products.max', 'Max')}</span>
                <input 
                  type="number" 
                  placeholder="999999" 
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="w-full h-8 border border-gray-300 dark:border-gray-700 rounded px-2 outline-none focus:border-red-400 bg-transparent text-black dark:text-white"
                />
              </div>
            </div>
            <button 
              onClick={applyPriceRange}
              className="w-full py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors text-sm font-medium"
            >
              {t('checkout.apply', 'Apply')}
            </button>
          </div>
        )}
      </div>

      {/* Condition */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsConditionOpen(!isConditionOpen)}>
          <h3 className="font-medium">{t('products.condition', 'Condition')}</h3>
          {isConditionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isConditionOpen && (
          <div className="flex flex-col gap-3 text-sm">
            {MOCK_CONDITIONS.map((c) => (
              <label key={c} className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <input 
                  type="radio" 
                  name="condition"
                  className="w-4 h-4 accent-red-500 cursor-pointer dark:bg-slate-800"
                  checked={selectedCondition === c}
                  onChange={() => setSelectedCondition(c)}
                />
                {t(`conditions.${c}`, c)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-4 text-black dark:text-white" onClick={() => setIsRatingOpen(!isRatingOpen)}>
          <h3 className="font-medium">{t('products.ratings', 'Ratings')}</h3>
          {isRatingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isRatingOpen && (
          <div className="flex flex-col gap-3">
            {[5, 4, 3, 2].map((stars) => (
              <label key={stars} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-red-500 cursor-pointer border-gray-300 dark:border-gray-600 rounded dark:bg-slate-800"
                  checked={selectedRatings.includes(stars)}
                  onChange={() => toggleArrayItem(selectedRatings, stars, setSelectedRatings)}
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < stars ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} />
                  ))}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default ProductSidebar
