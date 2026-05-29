import { Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 py-10 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{t('nav.home', 'Home')}</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-white font-medium">{t('nav.contact', 'Contact')}</span>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Card — Contact Info */}
          <Card className="w-full lg:w-[340px] flex-shrink-0 dark:bg-slate-900 dark:border-gray-800 transition-colors" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            <CardContent className="p-8 flex flex-col gap-8">

              {/* Call To Us */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#db4444] flex items-center justify-center flex-shrink-0">
                    <Phone size={18} strokeWidth={2} className="text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t('contact.call_to_us', 'Call To Us')}</h3>
                </div>
                <div className="flex flex-col gap-2 text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{t('contact.available', 'We are available 24/7, 7 days a week.')}</p>
                  <p>{t('contact.phone', 'Phone: +88016111122222')}</p>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Write To Us */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#db4444] flex items-center justify-center flex-shrink-0">
                    <Mail size={18} strokeWidth={2} className="text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t('contact.write_to_us', 'Write To Us')}</h3>
                </div>
                <div className="flex flex-col gap-2 text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{t('contact.fill_form', 'Fill out our form and we will contact you within 24 hours.')}</p>
                  <p>{t('contact.emails_customer', 'Emails: customer@exclusive.com')}</p>
                  <p>{t('contact.emails_support', 'Emails: support@exclusive.com')}</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Right Card — Contact Form */}
          <Card className="w-full dark:bg-slate-900 dark:border-gray-800 transition-colors" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            <CardContent className="p-8">
              <form className="flex flex-col gap-5">

                {/* Row 1: Name, Email, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    placeholder={t('auth.name_placeholder', 'Name')}
                    className="border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-[4px] text-[14px] placeholder:text-gray-400 focus-visible:ring-[#db4444] focus-visible:border-[#db4444]"
                  />
                  <Input
                    type="email"
                    placeholder={t('auth.email_placeholder2', 'Email')}
                    className="border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-[4px] text-[14px] placeholder:text-gray-400 focus-visible:ring-[#db4444] focus-visible:border-[#db4444]"
                  />
                  <Input
                    type="tel"
                    placeholder={t('auth.phone_placeholder', 'Phone')}
                    className="border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-[4px] text-[14px] placeholder:text-gray-400 focus-visible:ring-[#db4444] focus-visible:border-[#db4444]"
                  />
                </div>

                {/* Row 2: Message */}
                <Textarea
                  placeholder={t('contact.your_message', 'Your Message')}
                  rows={8}
                  className="border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-[4px] text-[14px] placeholder:text-gray-400 resize-none focus-visible:ring-[#db4444] focus-visible:border-[#db4444]"
                />

                {/* Row 3: Submit button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#db4444] hover:bg-red-600 text-white rounded-[4px] px-12 py-6 text-base font-medium transition-colors"
                  >
                    {t('contact.send_message', 'Send Message')}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Contact
