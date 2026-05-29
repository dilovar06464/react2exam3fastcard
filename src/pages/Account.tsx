import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Account = () => {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      {/* Breadcrumb & Welcome text */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">{t('nav.home', 'Home')}</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">{t('account.my_account', 'My Account')}</span>
        </div>
        <div className="text-sm">
          {t('account.welcome', 'Welcome!')} <span className="text-[#db4444] font-medium">Md Rimel</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-[250px] flex-shrink-0">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-base text-black dark:text-white">{t('account.manage_my_account', 'Manage My Account')}</h3>
              <div className="flex flex-col gap-2 pl-4 text-sm">
                <span className="text-[#db4444] font-medium cursor-pointer">{t('account.my_profile', 'My Profile')}</span>
                <span className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">{t('account.address_book', 'Address Book')}</span>
                <span className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">{t('account.my_payment_options', 'My Payment Options')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-base text-black dark:text-white">{t('account.my_orders', 'My Orders')}</h3>
              <div className="flex flex-col gap-2 pl-4 text-sm">
                <span className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">{t('account.my_returns', 'My Returns')}</span>
                <span className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">{t('account.my_cancellations', 'My Cancellations')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-base text-black dark:text-white cursor-pointer hover:text-[#db4444] dark:hover:text-[#db4444] transition-colors">{t('account.my_wishlist', 'My WishList')}</h3>
            </div>
            
          </div>
        </aside>

        {/* Right Content - Edit Profile Form */}
        <div className="flex-1 bg-white dark:bg-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded px-8 py-10 lg:px-12 lg:py-10 transition-colors">
          <h2 className="text-[#db4444] text-xl font-medium mb-8">{t('account.edit_your_profile', 'Edit Your Profile')}</h2>

          <form className="flex flex-col gap-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black dark:text-gray-300">{t('checkout.first_name', 'First Name')}</label>
                <input 
                  type="text" 
                  defaultValue="Md"
                  className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black dark:text-gray-300">{t('checkout.last_name', 'Last Name')}</label>
                <input 
                  type="text" 
                  defaultValue="Rimel"
                  className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black dark:text-gray-300">{t('auth.email_placeholder2', 'Email')}</label>
                <input 
                  type="email" 
                  defaultValue="rimel1111@gmail.com"
                  className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black dark:text-gray-300">{t('checkout.street_address', 'Address')}</label>
                <input 
                  type="text" 
                  defaultValue="Kingston, 5236, United State"
                  className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
                />
              </div>
            </div>

            {/* Password Changes */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-base font-medium mb-1 dark:text-white">{t('account.password_changes', 'Password Changes')}</h3>
              <input 
                type="password" 
                placeholder={t('account.current_password', 'Current Password')}
                className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
              />
              <input 
                type="password" 
                placeholder={t('account.new_password', 'New Password')}
                className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
              />
              <input 
                type="password" 
                placeholder={t('account.confirm_new_password', 'Confirm New Password')}
                className="w-full bg-[#f5f5f5] dark:bg-slate-800 dark:text-white rounded px-4 py-3 text-sm outline-none focus:bg-gray-100 dark:focus:bg-slate-700 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-6 mt-6">
              <button 
                type="button" 
                className="text-black dark:text-white font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {t('account.cancel', 'Cancel')}
              </button>
              <button 
                type="button"
                className="bg-[#db4444] text-white px-10 py-3 rounded font-medium hover:bg-red-600 transition-colors"
              >
                {t('account.save_changes', 'Save Changes')}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  )
}

export default Account
