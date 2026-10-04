import { useLanguage } from '../context/LanguageContext'
import { getWhatsAppUrl, DISPLAY_PHONE } from '../constants'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, dir } = useLanguage()

  const services = [
    { icon: '✂️', label: t.lang === 'ar' ? 'صالونات شعر' : t.lang === 'he' ? 'עיצוב שיער' : 'Hair Salons' },
    { icon: '💈', label: t.lang === 'ar' ? 'حلاقين وباربر' : t.lang === 'he' ? 'ברברשופ' : 'Barbers' },
    { icon: '💅', label: t.lang === 'ar' ? 'مراكز أظافر' : t.lang === 'he' ? 'מכוני ציפורניים' : 'Nail Studios' },
    { icon: '💆', label: t.lang === 'ar' ? 'عيادات بشرة' : t.lang === 'he' ? 'טיפוח ועור' : 'Skincare Clinics' },
    { icon: '🎨', label: t.lang === 'ar' ? 'ميك آب وتجميل' : t.lang === 'he' ? 'איפור ויופי' : 'Makeup & Beauty' },
    { icon: '✨', label: t.lang === 'ar' ? 'مساج وسبا' : t.lang === 'he' ? 'ספא וטיפולים' : 'Spa & Wellness' },
  ]

  const stats = [
    { value: '500+', label: t.hero.statBusinesses },
    { value: '50K+', label: t.hero.statAppointments },
    { value: '99%', label: t.hero.statSatisfaction },
  ]

  const waUrl = getWhatsAppUrl(t.floatingWhatsApp.message)

  return (
    <section className={styles.hero} id="home" aria-label="Hero Section">
      {/* Background blobs & lighting */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          {/* Badge */}
          <div className={`badge badge-primary animate-fadeInUp ${styles.heroBadge}`}>
            <span className={styles.sparkle}>✨</span>
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className={`section-title animate-fadeInUp delay-100 ${styles.headline}`}>
            <span>{t.hero.headlineStart}</span>
            <br />
            <span className="gradient-text">{t.hero.headlineGradient}</span>
            <br />
            <span>{t.hero.headlineEnd}</span>
          </h1>

          {/* Subtext */}
          <p className={`animate-fadeInUp delay-200 ${styles.subtext}`}>
            {t.hero.subtext}
          </p>

          {/* Target Business Types Tags */}
          <div className={`animate-fadeInUp delay-250 ${styles.serviceTags}`}>
            {services.map(s => (
              <span key={s.label} className={styles.serviceTag}>
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className={`animate-fadeInUp delay-300 ${styles.ctaRow}`}>
            <a
              href="#pricing"
              className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}
              id="hero-free-month-cta"
            >
              <span>🎁</span>
              <span>{t.hero.ctaFreeTrial}</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline btn-lg ${styles.ctaWhatsApp}`}
              id="hero-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t.hero.ctaWhatsApp}</span>
            </a>

            <a
              href="#demo"
              className={`btn btn-outline btn-lg ${styles.ctaDemo}`}
              id="hero-demo-btn"
            >
              <span>👁️</span>
              <span>{t.hero.ctaDemo}</span>
            </a>
          </div>

          {/* 4 PRIMARY HIGHLIGHTS CARDS (Top Highlights) */}
          <div className={`animate-fadeInUp delay-350 ${styles.highlightsGrid}`}>
            {t.highlights.map((h, i) => (
              <div key={i} className={styles.highlightCard}>
                <div className={styles.highlightTop}>
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <span className={styles.highlightTag}>{h.tag}</span>
                </div>
                <h3 className={styles.highlightTitle}>{h.title}</h3>
                <p className={styles.highlightDesc}>{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className={`animate-fadeInUp delay-400 ${styles.statsRow}`}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Live Simulation Preview */}
        <div className={`animate-fadeInUp delay-300 ${styles.visualArea}`} aria-hidden="true">
          <div className={`${styles.mockupCard} animate-float`}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupDots}>
                <span style={{ background: '#f43f5e' }} />
                <span style={{ background: '#fb923c' }} />
                <span style={{ background: '#22d3ee' }} />
              </div>
              <span className={styles.mockupTitle}>ProCut Salon Dashboard</span>
            </div>
            <div className={styles.mockupBody}>
              {t.hero.mockupAppointments.map((app, i) => {
                const gradients = [
                  'linear-gradient(135deg,#6366f1,#06b6d4)',
                  'linear-gradient(135deg,#f43f5e,#fb923c)',
                  'linear-gradient(135deg,#22d3ee,#6366f1)',
                ]
                return (
                  <div key={i} className={styles.mockupAppointment}>
                    <div className={styles.mockupAvatar} style={{ background: gradients[i % 3] }}>
                      {app.initial}
                    </div>
                    <div className={styles.mockupInfo}>
                      <div className={styles.mockupName}>{app.name}</div>
                      <div className={styles.mockupService}>{app.service}</div>
                    </div>
                    <div className={styles.mockupTime}>{app.time}</div>
                  </div>
                )
              })}

              <div className={styles.mockupStats}>
                <div className={styles.mockupStat}>
                  <span className={styles.mockupStatNum}>18</span>
                  <span className={styles.mockupStatLbl}>{t.lang === 'ar' ? 'مواعيد اليوم' : t.lang === 'he' ? 'תורים היום' : 'Today'}</span>
                </div>
                <div className={styles.mockupStat}>
                  <span className={styles.mockupStatNum}>{t.hero.todayRevenue}</span>
                  <span className={styles.mockupStatLbl}>{t.lang === 'ar' ? 'الإيراد' : t.lang === 'he' ? 'הכנסה' : 'Revenue'}</span>
                </div>
                <div className={styles.mockupStat}>
                  <span className={styles.mockupStatNum}>5.0 ⭐</span>
                  <span className={styles.mockupStatLbl}>{t.lang === 'ar' ? 'التقييم' : t.lang === 'he' ? 'דירוג' : 'Rating'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating live notification */}
          <div className={`${styles.notifCard} animate-float-slow`}>
            <span className={styles.notifIcon}>🔔</span>
            <div>
              <div className={styles.notifText}>{t.hero.liveBookingBadge}</div>
              <div className={styles.notifSub}>{t.hero.customerLabel}</div>
            </div>
          </div>

          {/* Floating auto-SMS badge */}
          <div className={`${styles.smsBadge} animate-float`} style={{ animationDelay: '2s' }}>
            <span>{t.hero.autoSmsBadge}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
