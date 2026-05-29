import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../components/ui/button'
import { axiosRequest, saveToken } from '../utils/token'
import { useDispatch } from 'react-redux'
import { clearCart } from '../reducer/cartSlice'
import { clearWishlist } from '../reducer/wishlistSlice'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [apiError, setApiError] = useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('auth.name_required', 'Name is required')),
      email: Yup.string().email(t('auth.email_invalid', 'Invalid email address')).required(t('auth.email_required2', 'Email is required')),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, t('auth.phone_digits', 'Phone number must contain only digits'))
        .min(7, t('auth.phone_short', 'Phone number is too short'))
        .required(t('auth.phone_required', 'Phone number is required')),
      password: Yup.string()
        .min(6, t('auth.password_short', 'Password must be at least 6 characters'))
        .required(t('auth.password_required', 'Password is required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('auth.password_match', 'Passwords do not match'))
        .required(t('auth.confirm_password_required', 'Please confirm your password')),
    }),
    onSubmit: async (values) => {
      try {
        setApiError('')
        const { data } = await axiosRequest.post('Account/register', {
          userName: values.name.trim(),
          phoneNumber: values.phoneNumber.trim(),
          email: values.email.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        saveToken(data.data)
        
        dispatch(clearCart())
        dispatch(clearWishlist())
        formik.resetForm()
        
        navigate('/login')
      } catch (error: any) {
        console.log('Full error:', error)
        console.log('Response data:', error?.response?.data)
        console.log('Status:', error?.response?.status)
        const isEntityError = error?.response?.data?.message?.includes?.('saving the entity') 
          || JSON.stringify(error?.response?.data)?.includes?.('saving the entity')
        const serverMsg = isEntityError
          ? 'This email or phone number is already registered. Please use different details.'
          : error?.response?.data?.message 
          || error?.response?.data?.title
          || error?.response?.data?.errors
          || error?.message 
          || 'Registration failed. Please try again.'
        const msg = typeof serverMsg === 'object' ? JSON.stringify(serverMsg) : serverMsg
        setApiError(msg)
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-[400px] p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        
        {/* Headings */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-wide mb-2 text-black dark:text-white">{t('auth.signup_title', 'Create an account')}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-[15px]">{t('auth.enter_details', 'Enter your details below')}</p>
        </div>

        <form  onSubmit={formik.handleSubmit}>
          {/* Form Inputs */}
          <div className="flex flex-col gap-4 mb-6">

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder={t('auth.name_placeholder', 'Name')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <input
                type="text"
                name="email"
                placeholder={t('auth.email_placeholder2', 'Email')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder={t('auth.phone_placeholder', 'Phone Number')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className={`w-full border ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('auth.confirm_password_placeholder', 'Confirm Password')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`w-full border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-[4px] px-4 py-3 text-[15px] outline-none focus:border-gray-500 transition-colors placeholder:text-gray-500 bg-transparent dark:text-white`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

          </div>

          {/* API Error */}
          {apiError && (
            <div className="text-red-500 text-sm text-center mb-4 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2">
              {apiError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#db4444] text-white rounded-[4px] py-6 text-base font-medium hover:bg-red-600 transition-colors"
            >
              {formik.isSubmitting ? t('auth.creating', 'Creating...') : t('auth.create_account', 'Create Account')}
            </Button>

            <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-[4px] py-3.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span className="text-gray-800 dark:text-white font-medium">{t('auth.signup_google', 'Sign up with Google')}</span>
            </button>
          </div>
        </form>

        {/* Footer Text */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-gray-500">{t('auth.have_account', 'Already have account?')}</p>
          <Link to="/login" className="font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 transition-colors">
            {t('auth.log_in', 'Log in')}
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default SignUp
