import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { clearCart } from '../reducer/cartSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.cart)
  const { t } = useTranslation()
  
  const [paymentMethod, setPaymentMethod] = useState('cash')

  useEffect(() => {
    window.scrollTo(0, 0)
    // If cart is empty, optionally redirect back to cart
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items.length, navigate])

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      phone: '',
      email: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t('checkout.err_first_name', 'First name is required')),
      lastName: Yup.string().required(t('checkout.err_last_name', 'Last name is required')),
      streetAddress: Yup.string().required(t('checkout.err_street', 'Street address is required')),
      apartment: Yup.string(),
      city: Yup.string().required(t('checkout.err_city', 'Town/City is required')),
      phone: Yup.string().required(t('auth.phone_required', 'Phone number is required')),
      email: Yup.string().email(t('auth.email_invalid', 'Invalid email address')).required(t('auth.email_required2', 'Email address is required'))
    }),
    onSubmit: (values) => {
      // Here you would normally send the order data + payment method to your backend
      console.log('Order Data:', values, 'Payment Method:', paymentMethod)
      alert("Order Placed Successfully!")
      dispatch(clearCart())
      navigate('/')
    }
  })

  return (
    <div className="container mx-auto px-4 max-w-6xl py-10">
      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mb-16">
        <Link to="/" className="hover:text-black dark:hover:text-white">{t('nav.product', 'Product')}</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-black dark:hover:text-white">{t('nav.view_cart', 'View Cart')}</Link>
        <span>/</span>
        <span className="text-black dark:text-white">{t('checkout.title', 'CheckOut')}</span>
      </div>

      <h1 className="text-3xl font-medium tracking-wide mb-10 dark:text-white">{t('checkout.billing_details', 'Billing Details')}</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Billing Form */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-white dark:bg-slate-900 p-8 rounded shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-colors">
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.first_name', 'First name')}</label>
            <input 
              id="firstName"
              name="firstName"
              type="text" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-xs">{formik.errors.firstName}</div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.last_name', 'Last name')}</label>
            <input 
              id="lastName"
              name="lastName"
              type="text" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.street_address', 'Street address')}</label>
            <input 
              id="streetAddress"
              name="streetAddress"
              type="text" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.streetAddress && formik.errors.streetAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <div className="text-red-500 text-xs">{formik.errors.streetAddress}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.apartment', 'Apartment, floor, etc. (optional)')}</label>
            <input 
              id="apartment"
              name="apartment"
              type="text" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apartment}
              className="w-full h-12 bg-white dark:bg-slate-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded px-4 outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.city', 'Town/City')}</label>
            <input 
              id="city"
              name="city"
              type="text" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.city && formik.errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-xs">{formik.errors.city}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.phone', 'Phone number')}</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.phone && formik.errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-xs">{formik.errors.phone}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 text-sm">{t('checkout.email', 'Email address')}</label>
            <input 
              id="email"
              name="email"
              type="email" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full h-12 bg-white dark:bg-slate-800 dark:text-white border rounded px-4 outline-none focus:ring-1 transition-colors ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600'}`} 
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input type="checkbox" id="save-info" className="w-5 h-5 accent-[#DB4444] rounded border-gray-300 cursor-pointer" />
            <label htmlFor="save-info" className="text-sm cursor-pointer dark:text-gray-300">{t('checkout.save_info', 'Save this information for faster check-out next time')}</label>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[420px] pt-4">
          
          <div className="flex flex-col gap-6 mb-6">
            {items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src={item.image} alt={item.productName} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <span className="font-medium text-sm max-w-[150px] truncate dark:text-white">{item.productName}</span>
                </div>
                <span className="font-medium text-sm dark:text-white">${(item.discountPrice || item.price) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-4 border-b border-gray-300 dark:border-gray-700">
            <span className="text-black dark:text-gray-300">{t('cart.subtotal', 'Subtotal')}:</span>
            <span className="font-medium dark:text-white">${calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between py-4 border-b border-gray-300 dark:border-gray-700">
            <span className="text-black dark:text-gray-300">{t('cart.shipping', 'Shipping')}:</span>
            <span className="font-medium dark:text-white">{t('cart.free', 'Free')}</span>
          </div>
          
          <div className="flex justify-between py-4 mb-6">
            <span className="text-black dark:text-gray-300">{t('cart.total', 'Total')}:</span>
            <span className="font-medium dark:text-white">${calculateSubtotal().toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-black dark:accent-white cursor-pointer"
                />
                <span className="text-base font-medium dark:text-white">{t('checkout.bank', 'Bank')}</span>
              </label>
              <div className="flex gap-1">
                {/* Mock Card Icons */}
                <div className="w-8 h-5 bg-[#FFAD33] rounded-sm text-[8px] flex items-center justify-center text-white font-bold">VISA</div>
                <div className="w-8 h-5 bg-[#DB4444] rounded-sm text-[8px] flex items-center justify-center text-white font-bold">MC</div>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="cash" 
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 accent-black dark:accent-white cursor-pointer"
              />
              <span className="text-base font-medium dark:text-white">{t('checkout.cash', 'Cash on delivery')}</span>
            </label>
          </div>

          <div className="flex gap-4 mb-8 bg-white dark:bg-slate-900 p-6 rounded shadow-[0_0_20px_rgba(0,0,0,0.05)] w-full max-w-sm transition-colors">
            <input 
              type="text" 
              placeholder={t('cart.coupon_placeholder', 'Coupon Code')}
              className="w-full h-12 px-4 bg-transparent dark:text-white border border-gray-200 dark:border-gray-700 rounded outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
            />
            <button type="button" className="h-12 px-8 bg-white dark:bg-slate-800 border border-[#DB4444] text-[#DB4444] rounded font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors whitespace-nowrap">
              {t('checkout.apply', 'Apply')}
            </button>
          </div>

          <button type="submit" className="h-14 px-12 bg-[#DB4444] text-white rounded font-medium hover:bg-red-600 transition-colors">
            {t('checkout.place_order', 'Place Order')}
          </button>
          
        </div>
      </form>
    </div>
  )
}

export default Checkout
