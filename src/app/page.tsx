import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import FooterSection from '@/components/FooterSection'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PortfolioSection from '@/components/PortfolioSection'
import ServicesSection from '@/components/ServicesSection'
import WhyUsSection from '@/components/WhyUsSection'

export default function HomePage() {
  return (
    <div className="text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyUsSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}
