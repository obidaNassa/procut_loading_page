import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import InteractiveDemo from './components/InteractiveDemo'
import DeepDive from './components/DeepDive'
import Recommendations from './components/Recommendations'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import SupportCards from './components/SupportCards'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InteractiveDemo />
        <DeepDive />
        <Recommendations />
        <Pricing />
        <Testimonials />
        <SupportCards />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
