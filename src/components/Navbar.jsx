import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.interactiveDemo, href: '#demo' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.testimonials, href: '#testimonials' },
  ]

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <nav className={styles.nav}>
          {/* Logo */}
          <a href="#" className={styles.logo} aria-label="ProCut Home">
            <div className={styles.logoBadge}>
              <span className={styles.logoIcon}>✂</span>
            </div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoText}>
                <span className={styles.logoPro}>Pro</span>
                <span className={styles.logoCut}>Cut</span>
              </span>
              <span className={styles.logoSub}>SALON OS</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {navLinks.map((l, i) => (
              <li key={i}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Actions: Language Switcher + Theme Switcher + CTA */}
          <div className={styles.actions}>
            {/* Theme Toggle Button */}
            <button
              type="button"
              className={styles.themeToggleBtn}
              onClick={() => setTheme(theme === 'gold' ? 'light-emerald' : 'gold')}
              title={theme === 'gold' ? 'Switch to Luxury Emerald' : 'Switch to Luxury Gold'}
            >
              {theme === 'gold' ? '🌿' : '👑'}
            </button>

            {/* Language Selector */}
            <div className={styles.langSelector} role="group" aria-label={t.nav.langSelect}>
              <button
                type="button"
                className={`${styles.langBtn} ${lang === 'ar' ? styles.langActive : ''}`}
                onClick={() => setLang('ar')}
                title="العربية"
              >
                عربي
              </button>
              <span className={styles.langDivider}>|</span>
              <button
                type="button"
                className={`${styles.langBtn} ${lang === 'he' ? styles.langActive : ''}`}
                onClick={() => setLang('he')}
                title="עברית"
              >
                עב
              </button>
              <span className={styles.langDivider}>|</span>
              <button
                type="button"
                className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
                onClick={() => setLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <a
              href="#pricing"
              className={`btn btn-primary ${styles.navCta}`}
              id="nav-cta-btn"
            >
              <span>🎁</span>
              <span>{t.nav.ctaBtn}</span>
            </a>

            {/* Mobile hamburger */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu (Sandwich Menu) */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>




        <ul className={styles.mobileLinks}>
          {navLinks.map((l, i) => (
            <li key={i}>
              <a href={l.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
