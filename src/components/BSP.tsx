import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Heart, Eye, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { addToCart } from '../reducer/cartSlice'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

import { getImageUrl } from '../utils/imageHelper'
const BSP = () => {
  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  // Select 4 random products, memoized so it doesn't shuffle on every render
  const randomProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  }, [products])

  if (isLoading) {
    return <div className="py-10 text-center">{t('bsp.loading', 'Loading best selling products...')}</div>
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <hr className="mb-14 border-gray-200" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('bsp.this_month', 'This Month')}</span>
        </div>
        
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-semibold tracking-wide">{t('bsp.title', 'Best Selling Products')}</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#DB4444] hover:bg-red-600 text-white px-10 py-3 rounded-sm font-medium transition-colors"
          >
            {t('bsp.view_all', 'View All')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
          {randomProducts.map((product: any) => {
            const discountPercentage = product.hasDiscount && product.price
              ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
              : 0;

            const imageUrl = getImageUrl(product.image);
            
            const isLiked = wishlistItems.some((item: any) => item.id === product.id);

            return (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-[#F5F5F5] rounded-sm p-4 h-[250px] flex items-center justify-center mb-4 overflow-hidden transition-colors">
                  
                  {/* Discount Badge */}
                  {product.hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{discountPercentage}%
                    </div>
                  )}
                  
                  {/* Action Icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors text-black"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    {/* Product Image */}
                    <img 
                      src={imageUrl} 
                      alt={product.productName} 
                      className="max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Add to Cart button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isAuthenticated) return navigate('/login')
                        dispatch(addToCart({ 
                          id: product.id, 
                          productName: product.productName, 
                          price: product.price, 
                          discountPrice: product.discountPrice, 
                          image: imageUrl, 
                          quantity: 1 
                        }))
                      }}
                      className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-gray-800"
                    >
                    {t('flash_sales.add_to_cart', 'Add To Cart')}
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-base text-gray-900 dark:text-white truncate">
                    {product.productName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 font-medium">
                      ${product.hasDiscount ? product.discountPrice : product.price}
                    </span>
                    {product.hasDiscount && (
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BSP