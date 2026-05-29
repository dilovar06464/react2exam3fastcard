import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getProducts } from '../api/ProductApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Heart, Eye, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { addToCart } from '../reducer/cartSlice'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'

import { getImageUrl } from '../utils/imageHelper'
const CountdownTimer = ({ t }: { t: any }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  })
  


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="flex items-end gap-4 ml-16">
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-gray-500 mb-1">{t('flash_sales.days', 'Days')}</span>
        <span className="text-3xl font-bold tracking-widest leading-none">{formatNumber(timeLeft.days)}</span>
      </div>
      <span className="text-red-500 text-3xl font-bold mb-1">:</span>
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-gray-500 mb-1">{t('flash_sales.hours', 'Hours')}</span>
        <span className="text-3xl font-bold tracking-widest leading-none">{formatNumber(timeLeft.hours)}</span>
      </div>
      <span className="text-red-500 text-3xl font-bold mb-1">:</span>
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-gray-500 mb-1">{t('flash_sales.minutes', 'Minutes')}</span>
        <span className="text-3xl font-bold tracking-widest leading-none">{formatNumber(timeLeft.minutes)}</span>
      </div>
      <span className="text-red-500 text-3xl font-bold mb-1">:</span>
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-gray-500 mb-1">{t('flash_sales.seconds', 'Seconds')}</span>
        <span className="text-3xl font-bold tracking-widest leading-none">{formatNumber(timeLeft.seconds)}</span>
      </div>
    </div>
  )
}

const FlashSalec = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  if (isLoading) {
    return <div className="py-10 text-center">{t('flash_sales.loading', 'Loading products...')}</div>
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('flash_sales.todays', "Today's")}</span>
        </div>
        
        <div className="flex items-end mb-8">
          <div className="flex items-end gap-6">
            <h2 className="text-3xl font-semibold tracking-wide">{t('flash_sales.title', 'Flash Sales')}</h2>
            <CountdownTimer t={t} />
          </div>
          {/* Swiper navigation buttons can be custom placed here if needed */}
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {products?.filter((product: any) => product.hasDiscount).map((product: any) => {
            const discountPercentage = product.hasDiscount && product.price
              ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
              : 0;

            const imageUrl = getImageUrl(product.image);

            const isLiked = wishlistItems.some((w: any) => w.id === product.id)

            return (
              <SwiperSlide key={product.id}>
                <div className="group cursor-pointer">
                  <div className="relative bg-[#F5F5F5] rounded-sm p-4 h-[250px] flex items-center justify-center mb-4 overflow-hidden transition-colors">
                    
                    {/* Discount Badge */}
                    {product.hasDiscount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{discountPercentage}%
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
                      alt={product.productName} 
                      className="max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Add to Cart button on hover */}
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
                      className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 z-20"
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
              </SwiperSlide>
            )
          })}
        </Swiper>
        
        <div className="flex justify-center mt-12 mb-14">
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#DB4444] hover:bg-red-600 text-white px-12 py-4 rounded-sm font-medium transition-colors"
          >
            {t('flash_sales.view_all', 'View All Products')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default FlashSalec