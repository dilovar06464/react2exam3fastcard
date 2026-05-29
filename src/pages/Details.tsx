import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { getProducts } from '../api/ProductApi'
import { addToCart } from '../reducer/cartSlice'
import { toggleWishlist } from '../reducer/wishlistSlice'
import { useAuth } from '../context/AuthContext'
import { Star, Heart, Truck, RefreshCcw, Minus, Plus, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getImageUrl } from '../utils/imageHelper'
const Details = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const { products, isLoading } = useSelector((state: RootState) => state.products)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  
  // Find product by id unconditionally for hooks
  const product = products.find((p: any) => p.id?.toString() === id)
  
  const [activeImage, setActiveImage] = useState(getImageUrl(product?.image))

  const sizes = product?.size ? product.size.split(',').map((s: string) => s.trim()) : ['XS', 'S', 'M', 'L', 'XL']

  const [quantity, setQuantity] = useState(2)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('blue')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!products.length) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length, id])

  // Reset active image if product changes
  useEffect(() => {
    setActiveImage(getImageUrl(product?.image))
    if (sizes.length > 0) {
      setSelectedSize(sizes[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id])

  const handleAddToCart = () => {
    if (!isAuthenticated) return navigate('/login')
    if (product) {
      dispatch(addToCart({ 
        id: product.id, 
        productName: product.productName, 
        price: product.price, 
        discountPrice: product.discountPrice, 
        image: getImageUrl(product.image), 
        quantity, 
        selectedSize, 
        selectedColor 
      }))
    }
  }

  const handleToggleWishlist = () => {
    if (!isAuthenticated) return navigate('/login')
    if (product) {
      dispatch(toggleWishlist(product))
    }
  }

  if (isLoading || !products.length) {
    return <div className="py-20 text-center text-xl">{t('details.loading', 'Loading product details...')}</div>
  }

  if (!product) {
    return <div className="py-20 text-center text-xl text-red-500">{t('details.not_found', 'Product not found.')}</div>
  }

  const price = product.hasDiscount ? product.discountPrice : product.price
  
  // Robust Images Parsing
  let parsedImages: string[] = []
  if (Array.isArray(product.images)) {
    parsedImages = product.images
  } else if (typeof product.images === 'string') {
    try {
      parsedImages = JSON.parse(product.images)
      if (!Array.isArray(parsedImages)) parsedImages = [product.images]
    } catch {
      parsedImages = product.images.split(',').map(s => s.trim()).filter(Boolean)
    }
  }

  // If no images found in array, fallback to main image
  if (parsedImages.length === 0 && product.image) {
    parsedImages = [product.image]
  }

  const thumbnails = parsedImages.slice(0, 4).map((img: string) => getImageUrl(img))

  // Related Items Mock (Get 4 other products)
  const relatedItems = products.filter((p: any) => p.id?.toString() !== id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 max-w-6xl py-10">
      {/* Breadcrumbs */}
      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mb-10">
        <Link to="/" className="hover:text-black dark:hover:text-white">{t('nav.account', 'Account')}</Link>
        <span>/</span>
        <Link to="/" className="hover:text-black dark:hover:text-white">{product.categoryName || 'Gaming'}</Link>
        <span>/</span>
        <span className="text-black dark:text-white">{product.productName}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Images Section */}
        <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-[60%]">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4">
            {thumbnails.map((thumbUrl: string, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(thumbUrl)}
                className={`w-[120px] h-[138px] bg-[#F5F5F5] rounded-sm flex items-center justify-center p-2 cursor-pointer border-2 transition-colors ${activeImage === thumbUrl ? 'border-red-500' : 'border-transparent hover:border-red-300'}`}
              >
                <img src={thumbUrl} alt={`thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="w-full h-[600px] bg-[#F5F5F5] rounded-sm flex items-center justify-center p-8 transition-colors">
            <img src={activeImage} alt={product.productName} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-[40%] flex flex-col gap-5 pt-2">
          <h1 className="text-2xl font-bold tracking-wide">{product.productName}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < (product.rating || 4) ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} 
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">({product.quantity || 150} {t('details.in_stock', 'In Stock')})</span>
            <span className="text-gray-400">|</span>
            <span className="text-[#00FF66] text-sm font-medium">{t('details.in_stock', 'In Stock')}</span>
          </div>

          <div className="text-2xl font-medium tracking-wide">
            ${price.toFixed(2)}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-b border-gray-300 dark:border-gray-700 pb-6">
            {product.description || t('details.no_description', 'No description provided for this product.')}
          </p>

          {/* Colours */}
          <div className="flex items-center gap-4 mt-2">
            <span className="font-medium text-lg">{t('details.colours', 'Colours:')}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedColor('blue')}
                className={`w-5 h-5 rounded-full bg-[#A0BCE0] border-[3px] ${selectedColor === 'blue' ? 'border-black' : 'border-transparent'}`}
              ></button>
              <button 
                onClick={() => setSelectedColor('red')}
                className={`w-5 h-5 rounded-full bg-[#E07575] border-[3px] ${selectedColor === 'red' ? 'border-black' : 'border-transparent'}`}
              ></button>
            </div>
          </div>

          {/* Size */}
          <div className="flex items-center gap-4 mt-2">
            <span className="font-medium text-lg">{t('details.size', 'Size:')}</span>
            <div className="flex flex-wrap items-center gap-4">
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-8 h-8 px-2 rounded border border-gray-300 flex items-center justify-center text-sm font-medium transition-colors ${
                    selectedSize === size ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-gray-400 rounded h-11 w-[160px]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors hover:border-red-500 border-r border-gray-400"
              >
                <Minus size={20} />
              </button>
              <div className="flex-1 flex items-center justify-center font-medium text-lg border-x-0">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center bg-[#DB4444] text-white border-[#DB4444] border-l hover:bg-red-600 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="h-11 px-10 bg-[#DB4444] text-white font-medium rounded hover:bg-red-600 transition-colors"
            >
              {t('flash_sales.add_to_cart', 'Add To Cart')}
            </button>
            
            <button 
              onClick={handleToggleWishlist}
              className={`w-11 h-11 border rounded flex items-center justify-center transition-colors ${
                wishlistItems.some((w: any) => w.id === product.id) 
                  ? 'bg-red-50 border-red-500 text-red-500' 
                  : 'border-gray-400 hover:bg-gray-50 text-black'
              }`}
            >
              <Heart 
                size={20} 
                className={wishlistItems.some((w: any) => w.id === product.id) ? 'fill-red-500 text-red-500' : ''} 
              />
            </button>
          </div>

          {/* Delivery Box */}
          <div className="border border-gray-400 rounded mt-6 flex flex-col">
            <div className="flex items-center gap-4 p-5 border-b border-gray-400">
              <Truck size={36} />
              <div>
                <h4 className="font-medium text-base mb-1">{t('details.free_delivery', 'Free Delivery')}</h4>
                <p className="text-xs font-medium text-black underline cursor-pointer">{t('details.enter_postal', 'Enter your postal code for Delivery Availability')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              <RefreshCcw size={36} />
              <div>
                <h4 className="font-medium text-base mb-1">{t('details.return_delivery', 'Return Delivery')}</h4>
                <p className="text-xs text-black">{t('details.free_30_days', 'Free 30 Days Delivery Returns.')} <span className="font-medium underline cursor-pointer">{t('details.details', 'Details')}</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Items */}
      <div className="mt-32 mb-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('details.related_item', 'Related Item')}</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
          {relatedItems.map((item: any) => {
            const discPercentage = item.hasDiscount && item.price
              ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
              : 0;

            const itemImgUrl = getImageUrl(item.image);

            const isLiked = wishlistItems.some((w: any) => w.id === item.id);

            return (
              <div key={item.id} className="group cursor-pointer block">
                <Link to={`/details/${item.id}`} className="relative bg-[#F5F5F5] rounded-sm p-4 h-[250px] flex items-center justify-center mb-4 overflow-hidden block transition-colors">
                  
                  {item.hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{discPercentage}%
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (!isAuthenticated) return navigate('/login')
                        dispatch(toggleWishlist(item))
                      }} 
                      className={`bg-white p-2 rounded-full shadow transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-black hover:bg-gray-100'}`}
                    >
                      <Heart size={18} className={isLiked ? "fill-current" : ""} />
                    </button>
                    <button onClick={(e) => e.preventDefault()} className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                      <Eye size={18} />
                    </button>
                  </div>

                  <img 
                    src={itemImgUrl} 
                    alt={item.productName} 
                    className="max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!isAuthenticated) return navigate('/login')
                      dispatch(addToCart({ 
                        id: item.id, 
                        productName: item.productName, 
                        price: item.price, 
                        discountPrice: item.discountPrice, 
                        image: itemImgUrl, 
                        quantity: 1 
                      }))
                    }} 
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 z-20"
                  >
                    {t('flash_sales.add_to_cart', 'Add To Cart')}
                  </button>
                </Link>

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
                  
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < (item.rating || 4) ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 text-gray-200"} 
                      />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">({item.quantity || 65})</span>
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

export default Details