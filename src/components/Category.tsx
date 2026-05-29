import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getCategories } from '../api/CategoryApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'



const Category = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { categories, isLoading } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <hr className="mb-14 border-gray-200" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('category.subtitle', 'Categories')}</span>
        </div>
        
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-semibold tracking-wide">{t('category.title', 'Browse By Category')}</h2>
          <div className="flex gap-2">
            <button className="category-prev bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <button className="category-next bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-10 text-center">{t('category.loading', 'Loading categories...')}</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            navigation={{
              nextEl: '.category-next',
              prevEl: '.category-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="pb-10"
          >
            {categories?.map((cat, index) => {
              const iconsList = [Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2]
              const IconComp = iconsList[index % iconsList.length]
              
              return (
                <SwiperSlide key={cat.id}>
                  <div 
                    onClick={() => navigate('/products', { state: { category: cat.categoryName } })}
                    className="group flex flex-col items-center justify-center gap-4 border border-gray-200 dark:border-gray-700 rounded p-6 h-[145px] cursor-pointer hover:bg-red-500 dark:hover:bg-red-600 hover:border-red-500 dark:hover:border-red-600 transition-all duration-300"
                  >
                    <IconComp size={48} strokeWidth={1} className="text-gray-800 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <span className="text-gray-800 dark:text-gray-300 group-hover:text-white text-[15px] font-medium transition-colors duration-300 text-center">
                      {t(`categories.${cat.categoryName}`, cat.categoryName)}
                    </span>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </section>
  )
}

export default Category