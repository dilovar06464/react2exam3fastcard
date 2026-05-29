import { useState } from 'react'
import { Search, Heart, ShoppingCart, User, ShoppingBag, LogOut, Languages, ChevronDown } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import NavLists from './components/NavLists'
import { ModeToggle } from './components/ModeToggle'
import { Link, useNavigate } from 'react-router-dom'
import logo from './assets/Images/Group 1000004658.png'
import { useAuth } from './context/AuthContext'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLangMenuOpen(false)
  }

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
         <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-extrabold tracking-tight text-black dark:text-white">fastcart</span>
        </Link>

        {/* Navigation */}
        <div className="flex">
          <NavLists />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search Bar */}
          <div className="relative flex items-center hidden md:flex">
            <input 
              type="text" 
              placeholder={t('header.search_placeholder', 'What are you looking for?')}
              className="bg-[#f5f5f5] dark:bg-gray-800 dark:text-white text-sm rounded-md pl-4 pr-10 py-2.5 w-[250px] outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
            />
            <Search className="absolute right-3 text-black dark:text-gray-300" size={18} strokeWidth={2} />
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                i18n.language === 'en' || !i18n.language 
                  ? 'bg-white dark:bg-slate-950 text-black dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => changeLanguage('ru')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                i18n.language === 'ru' 
                  ? 'bg-white dark:bg-slate-950 text-black dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              RU
            </button>
          </div>
          
          <ModeToggle />
          
          {/* Actions - Only shown when authenticated */}
          {isAuthenticated && (
            <>
              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition">
                <Heart size={24} strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#db4444] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              
              {/* Cart */}
              <Link to="/cart" className="relative text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition">
                <ShoppingCart size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#db4444] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile & Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className={`flex items-center justify-center transition ${
                    isAuthenticated
                      ? "w-8 h-8 rounded-full bg-[#db4444] text-white hover:bg-red-600" 
                      : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  <User size={isAuthenticated ? 18 : 24} strokeWidth={isAuthenticated ? 2 : 1.5} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-gray-900/95 backdrop-blur-md text-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="flex flex-col py-2">
                      <Link 
                        to="/account" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition text-sm"
                      >
                        <User size={18} />
                        <span>{t('header.account', 'Account')}</span>
                      </Link>
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition text-sm">
                        <ShoppingBag size={18} />
                        <span>{t('header.my_order', 'My Order')}</span>
                      </a>
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition text-sm w-full text-left">
                        <LogOut size={18} />
                        <span>{t('header.logout', 'Logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
