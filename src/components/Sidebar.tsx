import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getCategories } from '../api/CategoryApi'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { categories, isLoading } = useSelector((state: RootState) => state.categories)
  const [selected, setSelected] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="w-[220px] flex-shrink-0 pr-6 border-r border-gray-200">
        <div className="flex flex-col gap-2 pt-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <aside className="w-[220px] flex-shrink-0 pr-6 border-r border-gray-200">
      <ul className="flex flex-col gap-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => {
                setSelected(cat.categoryName)
                navigate('/products', { state: { category: cat.categoryName } })
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-300 group
                ${selected === cat.categoryName
                  ? 'text-white bg-[#db4444] shadow-lg shadow-red-500/30 scale-[1.02]'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#db4444] dark:hover:text-[#db4444] hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-[1.02]'
                }`}
            >
              <span>{t(`categories.${cat.categoryName}`, cat.categoryName)}</span>
              <ChevronRight
                size={18}
                className={`transition-all duration-300 ${selected === cat.categoryName ? 'opacity-100 text-white translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#db4444]'}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
