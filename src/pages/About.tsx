import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Store, CircleDollarSign, ShoppingBag, TrendingUp,
  Truck, Headphones, ShieldCheck,
} from 'lucide-react'

// Instagram SVG (removed from lucide-react)
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)

// Twitter/X SVG
const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.5 4.3 9 4-.9-4.2 4-6.5 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

// LinkedIn SVG
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import { Card, CardContent } from '../components/ui/card'
import aboutHero from '../assets/about-hero.png'
import teamTom from '../assets/team-tom.png'
import teamEmma from '../assets/team-emma.png'
import teamWill from '../assets/team-will.png'
import { useTranslation } from 'react-i18next'

const stats = [
  { icon: Store,           value: '10.5k', labelKey: 'about.sallers_active', defaultLabel: 'Sallers active our site',     highlight: false },
  { icon: CircleDollarSign,value: '33k',   labelKey: 'about.monthly_sale',   defaultLabel: 'Monthly Product Sale',         highlight: true  },
  { icon: ShoppingBag,     value: '45.5k', labelKey: 'about.customer_active',defaultLabel: 'Customer active in our site',  highlight: false },
  { icon: TrendingUp,      value: '25k',   labelKey: 'about.annual_sale',    defaultLabel: 'Anual gross sale in our site', highlight: false },
]

const team = [
  { name: 'Tom Cruise',   roleKey: 'about.role_founder',            defaultRole: 'Founder & Chairman',  img: teamTom  },
  { name: 'Emma Watson',  roleKey: 'about.role_managing_director',  defaultRole: 'Managing Director',    img: teamEmma },
  { name: 'Will Smith',   roleKey: 'about.role_product_designer',   defaultRole: 'Product Designer',     img: teamWill },
]

const services = [
  {
    icon: Truck,
    titleKey: 'services.free_delivery_title', defaultTitle: 'FREE AND FAST DELIVERY',
    descKey: 'services.free_delivery_desc',   defaultDesc: 'Free delivery for all orders over $140',
  },
  {
    icon: Headphones,
    titleKey: 'services.customer_service_title', defaultTitle: '24/7 CUSTOMER SERVICE',
    descKey: 'services.customer_service_desc',   defaultDesc: 'Friendly 24/7 customer support',
  },
  {
    icon: ShieldCheck,
    titleKey: 'services.money_back_title', defaultTitle: 'MONEY BACK GUARANTEE',
    descKey: 'services.money_back_desc',   defaultDesc: 'We return money within 30 days',
  },
]

const About = () => {
  const [activeSlide, setActiveSlide] = useState(2)
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 py-10 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{t('nav.home', 'Home')}</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-white font-medium">{t('nav.about', 'About')}</span>
        </nav>

        {/* Our Story Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{t('about.our_story', 'Our Story')}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
              {t('about.story_p1', "Launced in 2015, Exclusive is South Asia's premier online shopping makerplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
              {t('about.story_p2', "Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.")}
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src={aboutHero}
              alt="Shopping women"
              className="w-full h-[380px] object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className={`border transition-all duration-200 ${
                  stat.highlight
                    ? 'bg-[#db4444] border-[#db4444] text-white shadow-lg'
                    : 'border-gray-200 dark:border-gray-800 dark:bg-slate-900 hover:border-[#db4444] dark:hover:border-[#db4444] hover:shadow-md'
                }`}
              >
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.highlight ? 'bg-white/20' : 'bg-gray-100 dark:bg-slate-800'}`}>
                    <Icon size={26} strokeWidth={1.8} className={stat.highlight ? 'text-white' : 'text-gray-700 dark:text-gray-300'} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-2xl font-bold ${stat.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{stat.value}</span>
                    <span className={`text-sm ${stat.highlight ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>{t(stat.labelKey, stat.defaultLabel)}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Team Section */}
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col gap-3">
                {/* Photo */}
                <div className="bg-[#f5f5f5] dark:bg-slate-800 rounded-lg overflow-hidden aspect-[3/3.5] flex items-end justify-center">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t(member.roleKey, member.defaultRole)}</p>
                </div>
                {/* Social icons */}
                <div className="flex items-center gap-3">
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <TwitterIcon size={16} />
                  </a>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all duration-200 ${
                  activeSlide === i
                    ? 'w-5 h-3 bg-[#db4444] rounded-full'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-16 border-t border-gray-100 dark:border-gray-800">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                {/* Icon in bordered circle */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-slate-900 z-10">
                    <Icon size={28} strokeWidth={1.5} className="text-gray-800 dark:text-white" />
                  </div>
                  <div className="absolute w-20 h-20 rounded-full border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-1">{t(service.titleKey, service.defaultTitle)}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t(service.descKey, service.defaultDesc)}</p>
                </div>
              </div>
            )
          })}
        </section>

      </div>
    </div>
  )
}

export default About