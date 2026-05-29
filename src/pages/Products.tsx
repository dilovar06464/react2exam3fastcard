import { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { getProducts } from '../api/ProductApi'
import { getCategories } from '../api/CategoryApi'
import { axiosRequest } from '../utils/token'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'
import ProductSidebar from '../components/ProductSidebar'

const MOCK_FEATURES = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"]
const MOCK_CONDITIONS = ["Any", "Refurbished", "Brand new", "Old items"]

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const { t } = useTranslation()
  
  const { products } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  
  const [brands, setBrands] = useState<any[]>([])
  
  // Filtering States
  const [selectedCategory, setSelectedCategory] = useState<string>(location.state?.category || "All products")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [minPriceInput, setMinPriceInput] = useState<string>('')
  const [maxPriceInput, setMaxPriceInput] = useState<string>('')
  const [selectedCondition, setSelectedCondition] = useState<string>("Any")
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>("Populary")

  // Pagination State
  const [visibleCount, setVisibleCount] = useState<number>(9)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!products.length) dispatch(getProducts())
    if (!categories.length) dispatch(getCategories())
    
    const fetchBrands = async () => {
      try {
        const { data } = await axiosRequest.get('/Brand/get-brands')
        if (data?.data?.brands) setBrands(data.data.brands)
      } catch (error) {
        console.error("Failed to fetch brands", error)
      }
    }
    fetchBrands()
  }, [dispatch, products.length, categories.length])

  const toggleArrayItem = (arr: any[], item: any, setFn: any) => {
    if (arr.includes(item)) {
      setFn(arr.filter((i: any) => i !== item))
    } else {
      setFn([...arr, item])
    }
  }

  const applyPriceRange = () => {
    // Left for compatibility with the button, but filtering is now real-time
  }

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p: any) => {
      // 1. Category Filter
      if (selectedCategory !== "All products") {
        if (p.categoryName !== selectedCategory) return false
      }
      
      // 2. Brand Filter
      if (selectedBrands.length > 0) {
        const pBrand = (p.brandName || p.displayBrandName || "").toLowerCase()
        const matchesBrand = selectedBrands.some(b => {
          const lowerB = b.toLowerCase()
          return pBrand === lowerB || pBrand.includes(lowerB) || lowerB.includes(pBrand)
        })
        if (!matchesBrand && pBrand !== "") {
          const brandObj = brands.find(b => b.brandName && b.brandName.toLowerCase() === pBrand)
          if (!brandObj || !selectedBrands.includes(brandObj.brandName)) {
            return false
          }
        } else if (!matchesBrand) {
          return false
        }
      }

      // 3. Price Filter
      const actualPrice = Number(p.hasDiscount ? (p.discountPrice || p.price) : p.price)
      const currentMin = minPriceInput === '' ? 0 : Number(minPriceInput)
      const currentMax = maxPriceInput === '' ? 999999 : Number(maxPriceInput)
      
      if (actualPrice < currentMin || actualPrice > currentMax) {
        return false
      }

      // 4. Ratings Filter
      if (selectedRatings.length > 0) {
        const pRating = p.rating || (p.id % 3 === 0 ? 5 : p.id % 2 === 0 ? 3 : 4)
        if (!selectedRatings.includes(pRating)) return false
      }

      // 5. Features Filter
      if (selectedFeatures.length > 0) {
        const pFeatures = p.features || [MOCK_FEATURES[p.id % MOCK_FEATURES.length]]
        if (!selectedFeatures.some(f => pFeatures.includes(f))) return false
      }

      // 6. Condition Filter
      if (selectedCondition !== "Any") {
        const pCondition = p.condition || (p.id % 4 === 0 ? "Refurbished" : p.id % 3 === 0 ? "Old items" : "Brand new")
        if (pCondition !== selectedCondition) return false
      }

      return true
    })

    // Sorting Logic
    return filtered.sort((a: any, b: any) => {
      if (sortBy === "Price: Low to High") {
        const priceA = a.hasDiscount ? (a.discountPrice || a.price) : a.price
        const priceB = b.hasDiscount ? (b.discountPrice || b.price) : b.price
        return priceA - priceB
      }
      if (sortBy === "Price: High to Low") {
        const priceA = a.hasDiscount ? (a.discountPrice || a.price) : a.price
        const priceB = b.hasDiscount ? (b.discountPrice || b.price) : b.price
        return priceB - priceA
      }
      if (sortBy === "Newest") {
        return b.id - a.id // Assuming higher ID is newer, or you can use a date property if available
      }
      // "Populary" -> Assuming rating or quantity
      const ratingA = a.rating || (a.id % 3 === 0 ? 5 : a.id % 2 === 0 ? 3 : 4)
      const ratingB = b.rating || (b.id % 3 === 0 ? 5 : b.id % 2 === 0 ? 3 : 4)
      return ratingB - ratingA
    })
  }, [products, selectedCategory, selectedBrands, minPriceInput, maxPriceInput, selectedRatings, selectedFeatures, selectedCondition, brands, sortBy])

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(9)
  }, [selectedCategory, selectedBrands, minPriceInput, maxPriceInput, selectedRatings, selectedFeatures, selectedCondition, sortBy])

  const displayedProducts = filteredProducts.slice(0, visibleCount)

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-black dark:hover:text-white">{t('nav.home', 'Home')}</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">{t('brands.title', 'Explore Our Products')}</span>
        </div>
        
        <div className="relative text-black dark:text-white">
          <select 
            className="appearance-none bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 px-4 py-2 pr-10 rounded outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Populary">{t('products.sort_populary', 'Populary')}</option>
            <option value="Newest">{t('products.sort_newest', 'Newest')}</option>
            <option value="Price: Low to High">{t('products.sort_price_low', 'Price: Low to High')}</option>
            <option value="Price: High to Low">{t('products.sort_price_high', 'Price: High to Low')}</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR */}
        <ProductSidebar 
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
          minPriceInput={minPriceInput}
          setMinPriceInput={setMinPriceInput}
          maxPriceInput={maxPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          applyPriceRange={applyPriceRange}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          MOCK_FEATURES={MOCK_FEATURES}
          MOCK_CONDITIONS={MOCK_CONDITIONS}
          toggleArrayItem={toggleArrayItem}
        />

        {/* PRODUCT GRID */}
        <div className="w-full flex-1">
          {displayedProducts.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-lg">
              {t('products.no_match', 'No products match your selected filters.')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {displayedProducts.map((item: any, idx: number) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          )}

          {/* More Products Button (Pagination) */}
          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-10">
              <button 
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="px-10 py-3 bg-[#DB4444] text-white rounded font-medium hover:bg-red-600 transition-colors"
              >
                {t('products.more_products', 'More Products')}
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Products
