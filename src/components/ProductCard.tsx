import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { addToCart } from '../reducer/cartSlice'
import type { RootState, AppDispatch } from '../store/store'

import { getImageUrl } from '../utils/imageHelper'
interface ProductCardProps {
  item: any;
  idx?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, idx = 0 }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const discPercentage = item.hasDiscount && item.price
    ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
    : 0;

  const itemImgUrl = getImageUrl(item.image);

  const isLiked = wishlistItems.some((w: any) => w.id === item.id)

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation()
    if (!isAuthenticated) return navigate('/login')

    dispatch(addToCart({
      id: item.id,
      productName: item.productName || item.displayBrandName,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1
    }))
  }

  return (
    <div className="group cursor-pointer block">
      <div className="relative bg-[#F5F5F5] rounded-sm pt-4 pb-0 flex flex-col items-center justify-between mb-4 overflow-hidden h-[250px] transition-colors">
        
        {item.hasDiscount ? (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-medium px-3 py-1 rounded">
            -{discPercentage}%
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-[#00FF66] text-white text-[11px] font-medium px-3 py-1 rounded">
            NEW
          </div>
        )}
        
        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              if (!isAuthenticated) return navigate('/login')
              dispatch(toggleWishlist(item))
            }}
            className={`bg-white p-2 rounded-full shadow transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-black hover:bg-gray-100'}`}
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/details/${item.id}`)
            }}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors text-black"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Product Image */}
        <div className="w-3/4 h-3/4 flex items-center justify-center p-4">
          <Link to={`/details/${item.id}`} className="w-full h-full flex items-center justify-center">
            <img 
              src={itemImgUrl}
              alt={item.productName || item.displayBrandName} 
              className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Add to Cart button */}
        <button 
          onClick={(e) => handleAddToCart(e, item)}
          className="w-full bg-black text-white py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-auto opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0"
        >
          <ShoppingCart size={18} />
          {t('flash_sales.add_to_cart', 'Add To Cart')}
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-medium text-base truncate text-black dark:text-white">{item.productName || item.displayBrandName}</h3>
        <div className="flex items-center gap-3">
          <span className="text-red-500 font-medium">
            ${item.hasDiscount ? item.discountPrice : item.price}
          </span>
          {item.hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              ${item.price}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              const pRating = item.rating || (item.id % 3 === 0 ? 5 : item.id % 2 === 0 ? 3 : 4)
              return (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < pRating ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} 
                />
              )
            })}
          </div>
          <span className="text-gray-400 text-xs font-medium ml-1">({item.quantity || 65})</span>
        </div>
        
        {/* Color Dots Mock (seen in design) */}
        {idx % 2 === 1 && (
          <div className="flex gap-1.5 mt-1">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-black p-0.5">
              <div className="w-full h-full rounded-full bg-red-500"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-black border border-transparent hover:border-black p-0.5 cursor-pointer">
              <div className="w-full h-full rounded-full bg-black"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
