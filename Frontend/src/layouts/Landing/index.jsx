import React from 'react'
import HeroPage from './HeroSection/HeroPage'

import LandingFeatures from './features/LandingFeatures'
import Testimonial from './testimonial/Testimonial'
import Price from './priceSection/Price'
import FAQ from './FAQ/fyq'
import Footer from './Footer/footer'
import '../../Scroll.css'

const Landing = () => {
  return (
    <div>
      <div id="home">
        <HeroPage />
      </div>
      <div id="features">
        <LandingFeatures />
      </div>
      <Testimonial />
      <div id="pricing">
        <Price />
      </div>
      <div id="faq">
        <FAQ />
      </div>

      <Footer />

    </div>
  )
}

export default Landing
