import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
 import frame694 from '../assets/Frame 694.png'

const CountdownCircle = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center justify-center w-[62px] h-[62px] bg-white rounded-full">
    <span className="text-base font-bold leading-none text-black">{value}</span>
    <span className="text-[10px] font-medium leading-none text-black mt-1">{label}</span>
  </div>
)

const Categories = () => {
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-black rounded px-10 py-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          
          {/* Left Content */}
          <div className="z-10 flex flex-col items-start gap-8 md:w-1/2">
            <span className="text-[#00FF66] font-semibold text-sm">{t('categories_banner.subtitle', 'Categories')}</span>
            
            <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight tracking-wide" dangerouslySetInnerHTML={{ __html: t('categories_banner.title', 'Enhance Your<br />Music Experience') }}>
            </h2>
            
            <div className="flex items-center gap-4">
              <CountdownCircle value={formatNumber(timeLeft.hours)} label={t('flash_sales.hours', 'Hours')} />
              <CountdownCircle value={formatNumber(timeLeft.days)} label={t('flash_sales.days', 'Days')} />
              <CountdownCircle value={formatNumber(timeLeft.minutes)} label={t('flash_sales.minutes', 'Minutes')} />
              <CountdownCircle value={formatNumber(timeLeft.seconds)} label={t('flash_sales.seconds', 'Seconds')} />
            </div>

            <button className="bg-[#00FF66] text-black px-10 py-3 rounded text-sm font-semibold hover:bg-[#00e65c] transition-colors">
              {t('categories_banner.buy_now', 'Buy Now!')}
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-end z-10">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-white opacity-20 blur-[80px] rounded-full w-[400px] h-[400px] translate-x-1/4"></div>
            <img 
              src={frame694} 
              alt="JBL Boombox" 
              className="relative z-20 w-full max-w-[500px] object-cover mix-blend-lighten"
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Categories