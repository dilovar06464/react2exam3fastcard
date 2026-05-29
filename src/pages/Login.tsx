import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../components/ui/button'
import { axiosRequest, saveToken } from '../utils/token'
import { useAuth } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { clearCart } from '../reducer/cartSlice'
import { clearWishlist } from '../reducer/wishlistSlice'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login } = useAuth()
  const { t } = useTranslation()
  const [apiError, setApiError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t('auth.email_required', 'Email or phone number is required')),
      password: Yup.string().required(t('auth.password_required', 'Password is required')),
    }),
    onSubmit: async (values) => {
      console.log(values);
      
      try {
        setApiError('')
        const { data } = await axiosRequest.post('Account/login', {
          userName: values.email,
          password: values.password,
        })
        const token = data?.data || data
        if (token && typeof token === 'string') {
          saveToken(token)
          login(token)
          
          dispatch(clearCart())
          dispatch(clearWishlist())
          formik.resetForm()
          
          navigate('/')
        }
      } catch (error: any) {
        const msg = error?.response?.data?.message || error?.message || 'Login failed. Check your credentials.'
        setApiError(msg)
        console.log(error)
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-[400px] p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        
        {/* Headings */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-wide mb-2 text-black dark:text-white">{t('auth.login_title', 'Log in to Exclusive')}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-[15px]">{t('auth.enter_details', 'Enter your details below')}</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Form Inputs */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <input 
                type="text" 
                name="email"
                placeholder={t('auth.email_placeholder', 'Email or phone number')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <input 
                type="password" 
                name="password"
                placeholder={t('auth.password_placeholder', 'Password')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="text-red-500 text-sm text-center mb-2 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2">
              {apiError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <Button 
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#db4444] text-white rounded-[4px] py-6 font-medium text-base hover:bg-red-600 transition-colors"
            >
              {formik.isSubmitting ? t('auth.logging_in', 'Logging in...') : t('auth.log_in', 'Log In')}
            </Button>
          </div>
        </form>

        {/* Footer Text */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-gray-500">{t('auth.no_account', "Don't have account?")}</p>
          <Link to="/signup" className="font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 transition-colors">
            {t('auth.sign_up_link', 'Sign up')}
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Login
