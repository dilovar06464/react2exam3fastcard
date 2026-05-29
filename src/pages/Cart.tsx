import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { removeFromCart, updateQuantity } from '../reducer/cartSlice'
import { Minus, Plus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { items } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0)
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl py-10">
      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mb-10">
        <Link to="/" className="hover:text-black dark:hover:text-white">{t('nav.home', 'Home')}</Link>
        <span>/</span>
        <span className="text-black dark:text-white">{t('cart.title', 'Cart')}</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium mb-4">{t('cart.empty', 'Your cart is empty')}</h2>
          <Link to="/" className="inline-block bg-[#DB4444] text-white px-8 py-3 rounded hover:bg-red-600 transition-colors">
            {t('cart.return_shop', 'Return to Shop')}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm rounded-md transition-colors">
                  <th className="py-5 px-6 text-left font-medium w-1/4">{t('cart.product', 'Product')}</th>
                  <th className="py-5 px-6 text-left font-medium">{t('cart.price', 'Price')}</th>
                  <th className="py-5 px-6 text-center font-medium">{t('cart.quantity', 'Quantity')}</th>
                  <th className="py-5 px-6 text-right font-medium">{t('cart.subtotal', 'Subtotal')}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm rounded-md mb-4 bg-white dark:bg-slate-900 text-black dark:text-white block table-row mt-4">
                    <td className="py-6 px-6 relative group">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize, selectedColor: item.selectedColor }))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        <div className="w-[50px] h-[50px] bg-gray-100 dark:bg-slate-800 flex items-center justify-center p-1 rounded transition-colors">
                          <img src={item.image} alt={item.productName} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <span className="font-medium text-sm">
                          {item.productName}
                          {item.selectedSize && <span className="text-gray-500 dark:text-gray-400 ml-1">({item.selectedSize})</span>}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      ${item.discountPrice || item.price}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded w-[80px] h-10 mx-auto transition-colors">
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, selectedSize: item.selectedSize, selectedColor: item.selectedColor, quantity: Math.max(1, item.quantity - 1) }))}
                          className="w-8 flex justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, selectedSize: item.selectedSize, selectedColor: item.selectedColor, quantity: item.quantity + 1 }))}
                          className="w-8 flex justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right font-medium">
                      ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link to="/" className="px-10 py-3 border border-gray-400 dark:border-gray-600 rounded font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              {t('cart.return_shop', 'Return To Shop')}
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
            <div className="w-full lg:w-1/2 flex gap-4 items-start">
              <input 
                type="text" 
                placeholder={t('cart.coupon_placeholder', 'Coupon Code')}
                className="w-full max-w-[300px] h-12 px-4 border border-gray-900 dark:border-gray-700 bg-transparent text-black dark:text-white rounded outline-none transition-colors"
              />
              <button className="h-12 px-8 bg-[#DB4444] text-white rounded font-medium hover:bg-red-600 transition-colors whitespace-nowrap">
                {t('cart.apply_coupon', 'Apply Coupon')}
              </button>
            </div>
            
            <div className="w-full lg:w-[400px] border border-gray-900 dark:border-gray-700 text-black dark:text-white rounded p-6 transition-colors">
              <h3 className="text-xl font-medium mb-6">{t('cart.cart_total', 'Cart Total')}</h3>
              
              <div className="flex justify-between pb-4 border-b border-gray-300 dark:border-gray-700">
                <span className="text-gray-900 dark:text-gray-300">{t('cart.subtotal', 'Subtotal')}:</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-4 border-b border-gray-300 dark:border-gray-700">
                <span className="text-gray-900 dark:text-gray-300">{t('cart.shipping', 'Shipping')}:</span>
                <span className="font-medium">{t('cart.free', 'Free')}</span>
              </div>
              
              <div className="flex justify-between py-4 mb-4">
                <span className="text-gray-900 dark:text-gray-300">{t('cart.total', 'Total')}:</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full h-12 bg-[#DB4444] text-white rounded font-medium hover:bg-red-600 transition-colors"
              >
                {t('cart.process_checkout', 'Process to checkout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
