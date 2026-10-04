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
    legal: [
      { label: lang === 'ar' ? 'سياسة الخصوصية' : lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy', href: '#' },
      { label: lang === 'ar' ? 'شروط الاستخدام' : lang === 'he' ? 'תנאי שימוש' : 'Terms of Service', href: '#' },
      { label: lang === 'ar' ? 'إمكانية الوصول' : lang === 'he' ? 'הצהרת נגישות' : 'Accessibility', href: '#' },
    ],
    contact: [
      { label: `WhatsApp: ${DISPLAY_PHONE}`, href: waUrl },
      { label: lang === 'ar' ? 'دخول لوحة التحكم' : lang === 'he' ? 'כניסת בעלים' : 'Owner Login', href: 'https://procut.me' },
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
              <span className={styles.logoIcon}>✂</span>
              <span className={styles.logoText}>
                <span className={styles.logoPro}>Pro</span>
                <span className={styles.logoCut}>Cut</span>
              </span>
            </a>
            <p className={styles.brandDesc}>
              {t.footer.tagline}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.footerCta}`}
              id="footer-whatsapp-btn"
            >
              💬 {t.footer.whatsapp} ({DISPLAY_PHONE})
            </a>
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
            <h4 className={styles.linksTitle}>{lang === 'ar' ? 'الأحكام والخصوصية' : lang === 'he' ? 'משפטי' : 'Legal'}</h4>
            <ul className={styles.linksList}>
              {links.legal.map((l, i) => (
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
