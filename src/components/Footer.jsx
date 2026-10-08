import { useLanguage } from '../context/LanguageContext'
import { getWhatsAppUrl, DISPLAY_PHONE } from '../constants'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, lang } = useLanguage()
  const year = new Date().getFullYear()
  const waUrl = getWhatsAppUrl(t.floatingWhatsApp.message)

  const links = {
    product: [
      { label: t.nav.pricing, href: '#pricing' },
      { label: t.nav.interactiveDemo, href: '#demo' },
      { label: t.nav.features, href: '#features' },
    ],
    contact: [
      { label: `WhatsApp: ${DISPLAY_PHONE}`, href: waUrl },
      { label: lang === 'ar' ? 'دخول لوحة التحكم' : lang === 'he' ? 'כניסת בעלים' : 'Owner Login', href: 'https://procut.me/login' },
    ],
  }

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Footer">
      <div className={styles.topBorder} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <a href="#" className={styles.logo} aria-label="ProCut Home">
              <span className={styles.logoIcon}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5 3.5A1.5 1.5 0 0 1 6.5 2H14a7 7 0 0 1 7 7c0 3.866-3.134 7-7 7h-4v4.5a1.5 1.5 0 0 1-3 0v-17zm5 3.5v4h4a2 2 0 1 0 0-4h-4z" />
                </svg>
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoPro}>Pro</span>
                <span className={styles.logoCut}>Cut</span>
              </span>
            </a>
            <p className={styles.brandDesc}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>{t.footer.quickLinks}</h4>
            <ul className={styles.linksList}>
              {links.product.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className={styles.footerLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>{t.footer.contactUs}</h4>
            <ul className={styles.linksList}>
              {links.contact.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {t.footer.copyright}
          </p>
          <p className={styles.madeWith}>
            ProCut.me — Salon Booking & Management OS
          </p>
        </div>
      </div>
    </footer>
  )
}
