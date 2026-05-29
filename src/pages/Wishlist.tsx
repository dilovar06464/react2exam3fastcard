import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { addToCart } from '../reducer/cartSlice'
import { ShoppingCart, Trash2, Eye, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getImageUrl } from '../utils/imageHelper'
const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { items } = useSelector((state: RootState) => state.wishlist)
  const { products } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const moveAllToBag = () => {
    items.forEach(item => {
      dispatch(addToCart({
        id: item.id,
        productName: item.productName,
        price: item.price,
        discountPrice: item.discountPrice,
        image: item.image,
        quantity: 1
      }))
    })
  }

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation()
    dispatch(addToCart({
      id: item.id,
      productName: item.productName,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1
    }))
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-medium">{t('nav.wishlist', 'Wishlist')} ({items.length})</h2>
        {items.length > 0 && (
          <button 
            onClick={moveAllToBag}
            className="px-8 py-3 border border-gray-400 rounded font-medium hover:bg-gray-50 transition-colors"
          >
            {t('wishlist.move_all_to_bag', 'Move All To Bag')}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-500 mb-6">{t('wishlist.empty', 'Your wishlist is empty')}</h3>
          <Link to="/" className="inline-block px-10 py-3 border border-gray-400 rounded font-medium hover:bg-gray-50 transition-colors">
            {t('cart.return_shop', 'Return To Shop')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
          {items.map((item) => {
            const discPercentage = item.hasDiscount && item.price
              ? Math.round(((item.price - item.discountPrice!) / item.price) * 100)
              : 0;

            const imageUrl = getImageUrl(item.image);

            return (
              <div key={item.id} className="group cursor-pointer block" onClick={() => navigate(`/details/${item.id}`)}>
                <div className="relative bg-[#F5F5F5] rounded-sm h-[250px] flex items-center justify-center mb-4 overflow-hidden transition-colors">
                  
                  {item.hasDiscount && discPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{discPercentage}%
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        dispatch(toggleWishlist(item))
                      }} 
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors text-black"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <img 
                    src={imageUrl} 
                    alt={item.productName} 
                    className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, item)} 
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <ShoppingCart size={18} />
                    {t('flash_sales.add_to_cart', 'Add To Cart')}
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-base text-gray-900 truncate">
                    {item.productName}
                  </h3>
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
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Just For You Section */}
      <div className="mt-20 mb-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
            <span className="text-gray-900 font-medium text-lg">{t('wishlist.just_for_you', 'Just For You')}</span>
          </div>
          <Link to="/" className="px-10 py-3 border border-gray-400 rounded font-medium hover:bg-gray-50 transition-colors text-black">
            {t('products.see_all', 'See All')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
          {products.filter((p: any) => !p.hasDiscount).slice(0, 4).map((item: any) => {
            const discPercentage = item.hasDiscount && item.price
              ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
              : 0;

            const itemImgUrl = getImageUrl(item.image);

            return (
              <div key={item.id} className="group cursor-pointer block">
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

                  {/* Add to Cart button (always visible or on hover, based on design) */}
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="w-full bg-black text-white py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-auto"
                  >
                    <ShoppingCart size={18} />
                    {t('flash_sales.add_to_cart', 'Add To Cart')}
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-medium text-base truncate">{item.productName || item.displayBrandName}</h3>
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
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < (item.rating || 4) ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs font-medium ml-1">({item.quantity || 65})</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
