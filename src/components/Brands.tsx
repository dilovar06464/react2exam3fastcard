import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Heart, Eye, Star } from 'lucide-react'
import { axiosRequest } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../reducer/cartSlice'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { useAuth } from '../context/AuthContext'
import type { AppDispatch } from '../store/store'
import { useTranslation } from 'react-i18next'

import { getImageUrl } from '../utils/imageHelper'
const Brands = () => {
  const { products, isLoading: productsLoading } = useSelector((state: RootState) => state.products)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axiosRequest.get('/Brand/get-brands')
        if (data?.data?.brands) {
          setBrands(data.data.brands)
        }
      } catch (error) {
        console.error("Failed to fetch brands", error)
      }
    }
    fetchBrands()
  }, [])

  // Use the brands data provided by the backend to map 1 product per brand
  const brandProducts = useMemo(() => {
    if (!products || products.length === 0 || brands.length === 0) return []
    
    const selected: any[] = []
    const usedProductIds = new Set()
    const usedBrandNames = new Set()

    for (const brand of brands) {
      // Avoid duplicates like Apple ID 1 and Apple ID 6
      if (usedBrandNames.has(brand.brandName)) continue

      const productForBrand = products.find((p: any) => p.brandId === brand.id && !usedProductIds.has(p.id))
      if (productForBrand) {
        // Attach displayBrandName to show on the card
        selected.push({ ...productForBrand, displayBrandName: brand.brandName })
        usedProductIds.add(productForBrand.id)
        usedBrandNames.add(brand.brandName)
      }
    }

    // If we have less than 8 items, it means some brands had no products.
    // Let's use any available products and assign the unused brand names to them!
    if (selected.length < 8) {
      // Find which brands weren't used yet
      const unusedBrands = brands.filter((b: any) => !usedBrandNames.has(b.brandName))
      
      // Deduplicate unused brands
      const uniqueUnusedBrands = Array.from(new Map(unusedBrands.map(b => [b.brandName, b])).values())

      for (const p of products) {
        if (!usedProductIds.has(p.id)) {
          const nextBrand = uniqueUnusedBrands.shift()
          if (nextBrand) {
            selected.push({ ...p, displayBrandName: nextBrand.brandName })
            usedProductIds.add(p.id)
            usedBrandNames.add(nextBrand.brandName)
          } else {
             // Out of unused brands, just push the product normally
             selected.push({ ...p, displayBrandName: p.productName })
             usedProductIds.add(p.id)
          }
        }
        if (selected.length === 8) break
      }
    }

    return selected
  }, [products, brands])

  if (productsLoading) {
    return <div className="py-10 text-center">{t('brands.loading', 'Loading our products...')}</div>
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('brands.subtitle', 'Our Products')}</span>
        </div>
        
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-semibold tracking-wide">{t('brands.title', 'Explore Our Products')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-10">
          {brandProducts.map((product: any, index: number) => {
            const isNew = index >= 4 && index <= 5; // To match the two "NEW" badges in the photo
            
            const imageUrl = getImageUrl(product.image);

            const isLiked = wishlistItems.some((w: any) => w.id === product.id)

            return (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-[#F5F5F5] rounded-sm p-4 h-[250px] flex items-center justify-center mb-4 overflow-hidden transition-colors">
                  
                  {/* NEW Badge */}
                  {isNew && (
                    <div className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs font-semibold px-3 py-1 rounded">
                      {t('brands.new', 'NEW')}
                    </div>
                  )}
                  
                  {/* Action Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isAuthenticated) return navigate('/login')
                        dispatch(toggleWishlist(product))
                      }}
                      className={`bg-white p-2 rounded-full shadow transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-black hover:bg-gray-100'}`}
                    >
                      <Heart size={18} className={isLiked ? "fill-current" : ""} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/details/${product.id}`)
                      }}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <img 
                    src={imageUrl} 
                    alt={product.displayBrandName} 
                    className="max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Add to Cart button on hover */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!isAuthenticated) return navigate('/login')
                      dispatch(addToCart({ 
                        id: product.id, 
                        productName: product.displayBrandName, 
                        price: product.price, 
                        discountPrice: product.discountPrice, 
                        image: imageUrl, 
                        quantity: 1 
                      }))
                    }}
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 z-20"
                  >
                    {t('flash_sales.add_to_cart', 'Add To Cart')}
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-base text-gray-900 dark:text-white truncate">
                    {product.displayBrandName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 font-medium">
                      ${product.hasDiscount ? product.discountPrice : product.price}
                    </span>
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < (product.rating || 0) ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} 
                        />
                      ))}
                      <span className="text-gray-400 text-xs ml-1">({product.quantity || 0})</span>
                    </div>
                  </div>
                  
                  {/* Color selector circles mock */}
                  {index >= 4 && (
                    <div className="flex gap-2 mt-2 items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center cursor-pointer">
                        <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-[#000]' : 'bg-[#FB1314]'}`}></div>
                      </div>
                      <div className={`w-3 h-3 rounded-full cursor-pointer ${index % 2 === 0 ? 'bg-[#FB1314]' : 'bg-[#000]'}`}></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="flex justify-center mt-10">
          <button className="bg-[#DB4444] text-white px-10 py-3 rounded text-sm font-medium hover:bg-red-600 transition-colors">
            {t('flash_sales.view_all', 'View All Products')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Brands