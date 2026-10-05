import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import Features from './components/Features'
import InteractiveDemo from './components/InteractiveDemo'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <InteractiveDemo />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
