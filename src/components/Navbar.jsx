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
            {/* Theme Selector (Desktop) */}
            <div className={styles.themeSelector} role="group" aria-label={t.nav.themeSelect}>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'default' ? styles.themeIconActive : ''}`}
                onClick={() => setTheme('default')}
                title={t.nav.themeDefault}
              >
                🌌
              </button>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'gold' ? styles.themeIconActiveGold : ''}`}
                onClick={() => setTheme('gold')}
                title={t.nav.themeGold}
              >
                👑
              </button>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'light' ? styles.themeIconActiveLight : ''}`}
                onClick={() => setTheme('light')}
                title={t.nav.themeLight}
              >
                ☀️
              </button>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'light-indigo' ? styles.themeIconActiveLight : ''}`}
                onClick={() => setTheme('light-indigo')}
                title={t.nav.themeLightIndigo}
              >
                💎
              </button>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'light-emerald' ? styles.themeIconActiveLight : ''}`}
                onClick={() => setTheme('light-emerald')}
                title={t.nav.themeLightEmerald}
              >
                🌿
              </button>
              <button
                type="button"
                className={`${styles.themeIconBtn} ${theme === 'light-mint' ? styles.themeIconActiveLight : ''}`}
                onClick={() => setTheme('light-mint')}
                title={t.nav.themeLightMint}
              >
                🌊
              </button>
            </div>

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


        {/* Theme Selector inside Sandwich Menu */}
        <div className={styles.mobileThemeBar}>
          <span className={styles.themeLabel}>{t.nav.themeSelect}:</span>
          <div className={styles.themeGrid}>
            <button
              className={`${styles.themeBtn} ${theme === 'default' ? styles.themeActive : ''}`}
              onClick={() => { setTheme('default'); setMenuOpen(false); }}
              title={t.nav.themeDefault}
            >
              <span>{t.nav.themeDefault}</span>
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'gold' ? styles.themeActiveGold : ''}`}
              onClick={() => { setTheme('gold'); setMenuOpen(false); }}
              title={t.nav.themeGold}
            >
              <span>{t.nav.themeGold}</span>
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'light' ? styles.themeActiveLight : ''}`}
              onClick={() => { setTheme('light'); setMenuOpen(false); }}
              title={t.nav.themeLight}
            >
              <span>{t.nav.themeLight}</span>
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'light-indigo' ? styles.themeActiveLight : ''}`}
              onClick={() => { setTheme('light-indigo'); setMenuOpen(false); }}
              title={t.nav.themeLightIndigo}
            >
              <span>{t.nav.themeLightIndigo}</span>
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'light-emerald' ? styles.themeActiveLight : ''}`}
              onClick={() => { setTheme('light-emerald'); setMenuOpen(false); }}
              title={t.nav.themeLightEmerald}
            >
              <span>{t.nav.themeLightEmerald}</span>
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'light-mint' ? styles.themeActiveLight : ''}`}
              onClick={() => { setTheme('light-mint'); setMenuOpen(false); }}
              title={t.nav.themeLightMint}
            >
              <span>{t.nav.themeLightMint}</span>
            </button>
          </div>
        </div>

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
