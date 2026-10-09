import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const languages = [
    { code: 'he', label: 'עברית' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ]
  const currentLangLabel = languages.find(l => l.code === lang)?.label || 'עברית'

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

            {/* Language Switcher Pill Button + Dropdown */}
            <div className={styles.langDropdownWrapper} ref={langDropdownRef}>
              <button
                type="button"
                className={styles.langPillBtn}
                onClick={() => setLangDropdownOpen(prev => !prev)}
                aria-expanded={langDropdownOpen}
                aria-label={t.nav.langSelect}
              >
                <span className={styles.langPillText}>{currentLangLabel}</span>
                <span className={styles.langPillGlobe}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
              </button>

              {langDropdownOpen && (
                <div className={styles.langDropdownMenu} role="menu">
                  {languages.map((item) => {
                    const isActive = lang === item.code
                    return (
                      <button
                        key={item.code}
                        type="button"
                        className={`${styles.langDropdownItem} ${isActive ? styles.langDropdownItemActive : ''}`}
                        onClick={() => {
                          setLang(item.code)
                          setLangDropdownOpen(false)
                        }}
                        role="menuitem"
                      >
                        <span className={styles.langDropdownLabel}>{item.label}</span>
                        {isActive && (
                          <span className={styles.langCheckmark}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Header CTA: Owner Login (כניסת בעלים) */}
            <a
              href="https://procut.me/login"
              className={`btn btn-primary ${styles.navCta}`}
              id="nav-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginInlineEnd: 6 }}>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>{t.nav.ownerLogin || 'כניסת בעלים'}</span>
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
          <li className={styles.mobileActionItem}>
            <a
              href="https://procut.me/login"
              className={`${styles.mobileLink} ${styles.mobileOwnerLogin}`}
              onClick={() => setMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginInlineEnd: 8 }}>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>{t.nav.ownerLogin || 'כניסת בעלים'}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
