import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { AppDispatch } from '../store/store'
import { getCategories } from '../api/CategoryApi'
import { ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import FlashSalec from '../components/FlashSalec'
import Category from '../components/Category'
import BSP from '../components/BSP'
import Categories from '../components/Categories'
import Brands from '../components/Brands'
import NewArival from '../components/NewArival'
import Sidebar from '../components/Sidebar'
import 'swiper/css'
import 'swiper/css/pagination'
import img1 from '../assets/hero_endframe__cvklg0xk3w6e_large 2.png'

// Apple Logo SVG
const AppleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-1.12-1.026-2.585-1.572-4.14-1.572-2.912 0-5.748 1.942-7.228 5.176-1.506 3.298-1.536 7.424-.044 10.742 1.458 3.238 4.226 5.21 7.27 5.21 1.582 0 3.09-.588 4.238-1.63 1.156 1.05 2.664 1.63 4.248 1.63 3.044 0 5.814-1.97 7.27-5.21 1.492-3.318 1.464-7.444-.044-10.742-1.48-3.234-4.316-5.176-7.228-5.176-1.556 0-3.02.546-4.14 1.572z"/>
    <path d="M12.012 6.344c1.972 0 3.65-1.386 4.148-3.324a4.198 4.198 0 0 0-3.27-5.012c-1.956-.376-3.834.786-4.404 2.698a4.198 4.198 0 0 0 3.526 5.638z"/>
  </svg>
)

const getSlides = (t: any) => [
  { id: 1, title: t('home.slide1_title', 'Up to 10% off Voucher'), series: t('home.slide1_series', 'iPhone 14 Series'), image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0oD3swfZxze-ureKwLwWX-X-z0IAbUfxT_w&s' },
  { id: 2, title: t('home.slide2_title', 'Up to 15% off Voucher'), series: t('home.slide2_series', 'iPhone 15 Series'), image: img1 },
  { id: 3, title: t('home.slide3_title', 'Up to 20% off Voucher'), series: t('home.slide3_series', 'MacBook Pro M3'), image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop' },
]
const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const slides = getSlides(t)


  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <>
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex gap-8">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 pt-8 pb-8 pl-8 overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full bg-black rounded-sm"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex items-center justify-between h-[344px] px-16 text-white">
                  <div className="flex flex-col gap-5 max-w-sm">
                    <div className="flex items-center gap-4">
                      <AppleLogo />
                      <span className="text-sm font-medium">{slide.series}</span>
                    </div>
                    <h2 className="text-5xl font-semibold leading-tight tracking-wide">
                      {slide.title.split(' ').map((word: string, i: number) => (
                        <span key={i}>
                          {word} {i === 3 ? <br /> : ''}
                        </span>
                      ))}
                    </h2>
                    <a href="#" className="flex items-center gap-2 mt-4 hover:underline underline-offset-8 decoration-gray-400 w-fit">
                      <span className="text-base font-medium">{t('home.shop_now', 'Shop Now')}</span>
                      <ArrowRight size={20} />
                    </a>
                  </div>
                  <div className="relative h-full flex items-center justify-end">
                    
                    <img 
                      src={slide.image} 
                      alt={slide.series} 
                      className="object-contain h-[300px] w-auto max-w-md opacity-90"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      </div>
    </div>
    <FlashSalec />
    <Category />
    <BSP />
    <Categories />
    <Brands />
    <NewArival />
    </>
  )
}

export default Home