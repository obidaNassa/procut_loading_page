import { useLanguage } from '../context/LanguageContext'
import { getWhatsAppUrl, DISPLAY_PHONE } from '../constants'
import styles from './SupportCards.module.css'

export default function SupportCards() {
  const { t, lang } = useLanguage()

  const waCustomUrl = getWhatsAppUrl(
    lang === 'ar'
      ? 'مرحباً طاقم ProCut، أود طلب تعديلات وتخصيصات معينة لصالوني.'
      : lang === 'he'
      ? 'שלום לצוות ProCut, אני מעוניין לבקש התאמות ושינויים ספציפיים למספרה/לקליניקה שלי.'
      : 'Hello ProCut team, I would like to request custom tweaks tailored to my salon.'
  )

  const waFreeTrialUrl = getWhatsAppUrl(
    lang === 'ar'
      ? 'مرحباً، أود بدء وتفعيل الشهر المجاني بالكامل (بدون أي التزام מראש).'
      : lang === 'he'
      ? 'שלום, אשמח להתחיל ולהפעיל חודש ניסיון חינם מלא (ללא כל התחייבות מראש).'
      : 'Hello, I would like to activate my 100% free month trial with zero commitment.'
  )

  const waSupportUrl = getWhatsAppUrl(
    lang === 'ar'
      ? 'مرحباً، أحتاج مساعدة أو استفساراً تقنياً بخصوص نظام ProCut.'
      : lang === 'he'
      ? 'שלום, אשמח לעזרה או מענה טכני לגבי מערכת ProCut.'
      : 'Hello, I need technical support or assistance regarding ProCut system.'
  )

  return (
    <section className={styles.section} id="support-cards" aria-label="Support and Action Cards">
      <div className="container">
        <div className={styles.grid}>
          {/* Card 1: Custom Modifications */}
          <div className={styles.card}>
            <div className={styles.iconWrap} style={{ background: 'rgba(99,102,241,0.15)', borderColor: 'var(--brand-1)' }}>
              <span>🎨</span>
            </div>
            <h3 className={styles.title}>{t.supportCards.card1Title}</h3>
            <p className={styles.desc}>{t.supportCards.card1Desc}</p>
            <a
              href={waCustomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${styles.btn}`}
              id="cta-custom-mods"
            >
              💬 {t.supportCards.card1Btn}
            </a>
          </div>

          {/* Card 2: Free Month Activation */}
          <div className={`${styles.card} ${styles.cardPrimary}`}>
            <div className={styles.iconWrap} style={{ background: 'linear-gradient(135deg,var(--brand-1),var(--brand-2))' }}>
              <span>🎁</span>
            </div>
            <h3 className={styles.title}>{t.supportCards.card2Title}</h3>
            <p className={styles.desc}>{t.supportCards.card2Desc}</p>
            <a
              href={waFreeTrialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.btn}`}
              id="cta-free-month-bottom"
            >
              ⚡ {t.supportCards.card2Btn}
            </a>
          </div>

          {/* Card 3: 24/7 Support */}
          <div className={styles.card}>
            <div className={styles.iconWrap} style={{ background: 'rgba(37,211,102,0.15)', borderColor: '#25d366' }}>
              <span>🛡️</span>
            </div>
            <h3 className={styles.title}>{t.supportCards.card3Title}</h3>
            <p className={styles.desc}>{t.supportCards.card3Desc}</p>
            <a
              href={waSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${styles.btn} ${styles.btnWa}`}
              id="cta-support-247"
            >
              📞 {t.supportCards.card3Btn} ({DISPLAY_PHONE})
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
