import { Send, Copyright } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-black text-white pt-16 pb-6 mt-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Column 1: Exclusive */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 tracking-wide">{t('footer.exclusive', 'Exclusive')}</h3>
            <h4 className="text-lg font-medium">{t('footer.subscribe', 'Subscribe')}</h4>
            <p className="text-sm text-gray-300">{t('footer.get_off', 'Get 10% off your first order')}</p>
            <div className="relative mt-2 max-w-[250px]">
              <input 
                type="email" 
                placeholder={t('footer.enter_email', 'Enter your email')}
                className="w-full bg-transparent border border-white rounded py-2.5 pl-4 pr-12 text-sm outline-none focus:border-gray-400 placeholder:text-gray-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition">
                <Send size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 tracking-wide">{t('footer.support', 'Support')}</h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-[200px]" dangerouslySetInnerHTML={{ __html: t('footer.address', '111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.') }}></p>
            <p className="text-sm text-gray-300">exclusive@gmail.com</p>
            <p className="text-sm text-gray-300">+88015-88888-9999</p>
          </div>

          {/* Column 3: Account */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 tracking-wide">{t('footer.account', 'Account')}</h3>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.my_account', 'My Account')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.cart', 'Cart')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.wishlist', 'Wishlist')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.shop', 'Shop')}</a>
          </div>

          {/* Column 4: Quick Link */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 tracking-wide">{t('footer.quick_link', 'Quick Link')}</h3>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.privacy_policy', 'Privacy Policy')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.terms_of_use', 'Terms Of Use')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.faq', 'FAQ')}</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">{t('footer.contact', 'Contact')}</a>
          </div>

          {/* Column 5: Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2 tracking-wide">{t('footer.social', 'Social')}</h3>
            <div className="flex items-center gap-6 mt-2">
              <a href="#" className="text-white hover:text-gray-400 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 pt-6 mt-10">
        <div className="flex items-center justify-center gap-1.5 text-gray-500 text-sm">
          <Copyright size={18} strokeWidth={1.5} />
          <p>{t('footer.copyright', 'Copyright Rimel 2022. All right reserved')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
