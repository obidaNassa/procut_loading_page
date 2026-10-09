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
      { label: t.nav.testimonials, href: '#testimonials' },
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

        {/* Bottom section with copyright above and legal links below */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            {t.footer.copyright}
          </p>

          <div className={styles.legalBar}>
            <a
              href="https://procut.me/accessibility"
              className={styles.legalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.legalIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="17.5" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
                  <path d="M14.5 7.5L11 9.5l2.5 4.5h4.5v4" />
                  <path d="M7 11.5a5 5 0 1 0 6.5 4.5" />
                  <path d="M11 9.5L7.5 7" />
                </svg>
              </span>
              <span>{t.footer.accessibility}</span>
            </a>

            <a
              href="https://procut.me/privacy"
              className={styles.legalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.legalIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span>{t.footer.privacy}</span>
            </a>

            <a
              href="https://procut.me/terms"
              className={styles.legalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.legalIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <span>{t.footer.terms}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
