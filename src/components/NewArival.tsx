import { Truck, Headphones, ShieldCheck } from 'lucide-react'
import image1 from '../assets/Images/652e82cd70aa6522dd785109a455904c.png'
import image2 from '../assets/Images/Frame 707.png'
import image3 from '../assets/Images/attractive-woman-wearing-hat-posing-black-background 1.png'
import image4 from '../assets/Images/ps5-slim-goedkope-playstation_large 1.png'
import { useTranslation } from 'react-i18next'


const NewArival = () => {
  const { t } = useTranslation()
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <span className="text-red-500 font-bold text-sm uppercase">{t('new_arrival.featured', 'Featured')}</span>
        </div>
        
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-semibold tracking-wide">{t('new_arrival.title', 'New Arrival')}</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] h-auto lg:h-[600px] mb-24">
          
          {/* Left Large Column (PS5) */}
          <div className="relative bg-black rounded-sm overflow-hidden group">
            <img 
              src={image4} 
              alt="PlayStation 5" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-3 w-full bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-2xl font-semibold tracking-wide">{t('new_arrival.ps5_title', 'PlayStation 5')}</h3>
              <p className="text-gray-300 text-sm max-w-[250px] leading-relaxed">
                {t('new_arrival.ps5_desc', 'Black and White version of the PS5 coming out on sale.')}
              </p>
              <a href="#" className="text-white font-medium underline underline-offset-8 decoration-white hover:text-gray-300 w-fit mt-1">
                {t('home.shop_now', 'Shop Now')}
              </a>
            </div>
          </div>

          {/* Right Column (Split into Top and Bottom Grid) */}
          <div className="grid grid-rows-2 gap-[30px] h-full">
            
            {/* Top Wide (Women's Collections) */}
            <div className="relative bg-[#0d0d0d] rounded-sm overflow-hidden group h-full">
              <img 
                src={image3} 
                alt="Women's Collections" 
                className="w-full h-full object-cover opacity-80 object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-xl font-semibold tracking-wide">{t('new_arrival.womens_title', "Women's Collections")}</h3>
                <p className="text-gray-300 text-sm max-w-[250px] leading-relaxed">
                  {t('new_arrival.womens_desc', 'Featured woman collections that give you another vibe.')}
                </p>
                <a href="#" className="text-white font-medium underline underline-offset-8 decoration-white hover:text-gray-300 w-fit">
                  {t('home.shop_now', 'Shop Now')}
                </a>
              </div>
            </div>

            {/* Bottom Split (Speakers and Perfume) */}
            <div className="grid grid-cols-2 gap-[30px] h-full">
              
              {/* Speakers */}
              <div className="relative bg-[#121212] rounded-sm overflow-hidden group h-full flex items-center justify-center">
                <img 
                  src={image2} 
                  alt="Speakers" 
                  className="relative z-10 w-[55%] h-[55%] object-contain opacity-90 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2 w-full bg-gradient-to-t from-black/90 to-transparent z-20">
                  <h3 className="text-white text-lg font-semibold tracking-wide">{t('new_arrival.speakers_title', 'Speakers')}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed max-w-[150px]">
                    {t('new_arrival.speakers_desc', 'Amazon wireless speakers')}
                  </p>
                  <a href="#" className="text-white text-sm font-medium underline underline-offset-8 decoration-white hover:text-gray-300 w-fit mt-1">
                    {t('home.shop_now', 'Shop Now')}
                  </a>
                </div>
              </div>

              {/* Perfume */}
              <div className="relative bg-[#121212] rounded-sm overflow-hidden group h-full flex items-center justify-center">
                <img 
                  src={image1} 
                  alt="Perfume" 
                  className="relative z-10 w-[55%] h-[55%] object-contain opacity-90 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2 w-full bg-gradient-to-t from-black/90 to-transparent z-20">
                  <h3 className="text-white text-lg font-semibold tracking-wide">{t('new_arrival.perfume_title', 'Perfume')}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed max-w-[150px]">
                    {t('new_arrival.perfume_desc', 'GUCCI INTENSE OUD EDP')}
                  </p>
                  <a href="#" className="text-white text-sm font-medium underline underline-offset-8 decoration-white hover:text-gray-300 w-fit mt-1">
                    {t('home.shop_now', 'Shop Now')}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features / Services Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[88px] mt-50 py-10 mb-10">
          
          <div className="flex flex-col items-center text-center gap-[24px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#c1c0c1] flex items-center justify-center">
              <div className="w-[58px] h-[58px] bg-black rounded-full flex items-center justify-center text-white">
                <Truck size={36} strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-black text-[20px] uppercase">{t('services.delivery_title', 'Free And Fast Delivery')}</h4>
              <p className="text-[14px] text-gray-600">{t('services.delivery_desc', 'Free delivery for all orders over $140')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-[24px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#c1c0c1] flex items-center justify-center">
              <div className="w-[58px] h-[58px] bg-black rounded-full flex items-center justify-center text-white">
                <Headphones size={36} strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-black text-[20px] uppercase">{t('services.support_title', '24/7 Customer Service')}</h4>
              <p className="text-[14px] text-gray-600">{t('services.support_desc', 'Friendly 24/7 customer support')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-[24px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#c1c0c1] flex items-center justify-center">
              <div className="w-[58px] h-[58px] bg-black rounded-full flex items-center justify-center text-white">
                <ShieldCheck size={36} strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-black text-[20px] uppercase">{t('services.guarantee_title', 'Money Back Guarantee')}</h4>
              <p className="text-[14px] text-gray-600">{t('services.guarantee_desc', 'We return money within 30 days')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default NewArival