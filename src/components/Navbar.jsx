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
            <span className={styles.logoText}>
              <span className={styles.logoPro}>Pro</span>
              <span className={styles.logoCut}>Cut</span>
            </span>
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
            {/* Theme Toggle Button (Dark / Light) */}
            <button
              type="button"
              className={styles.themeToggleBtn}
              onClick={() => setTheme(theme === 'gold' ? 'light-emerald' : 'gold')}
              title={theme === 'gold' ? (lang === 'ar' ? 'التبديل إلى الوضع النهاري' : lang === 'he' ? 'מעבר למצב יום' : 'Switch to Light Mode') : (lang === 'ar' ? 'التبديل إلى الوضع الليلي' : lang === 'he' ? 'מעבר למצב לילה' : 'Switch to Dark Mode')}
              aria-label="Toggle dark/light theme"
            >
              {theme === 'gold' ? (
                /* Sun icon when in dark/gold theme */
                <svg className={styles.themeIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="12" y1="2" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="22"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                /* Moon icon when in light theme */
                <svg className={styles.themeIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
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
