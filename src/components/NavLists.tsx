import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

const NavLists = () => {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()

  const navMenu = [
    { path: "/", title: t('header.home', 'Home'), key: 'home' },
    { path: "/contact", title: t('header.contact', 'Contact'), key: 'contact' },
    { path: "/about", title: t('header.about', 'About'), key: 'about' },
    ...(!isAuthenticated ? [{ path: "/signup", title: t('header.signup', 'Sign Up'), key: 'signup' }] : [])
  ]

  return (
    <nav className="flex items-center gap-8">
      {navMenu.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          className={({ isActive }) =>
            `transition-colors hover:text-black dark:hover:text-white text-base font-medium ${
              isActive ? 'text-black dark:text-white underline underline-offset-8 decoration-gray-400 decoration-2' : 'text-gray-600 dark:text-gray-400'
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavLists
