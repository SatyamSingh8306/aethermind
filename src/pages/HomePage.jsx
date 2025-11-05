import { useEffect, useState, memo } from 'react'
import BackgroundAnimation from '../components/BackgroundAnimation'
import CtaSection from '../sections/CtaSecion';
import FeaturesSection from '../sections/FeatureSection';
import HeroSection from '../sections/HeroSection'
import HowItWorksSection from '../sections/HowItWorksSection'

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home-page">
      <BackgroundAnimation />
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection/>

      {/* How It Works Section */}
      <HowItWorksSection/>

      {/* CTA Section */}
      <CtaSection/>
    </div>
  )
}

export default HomePage
