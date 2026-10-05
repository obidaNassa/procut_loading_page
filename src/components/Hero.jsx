import { useLanguage } from '../context/LanguageContext'
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
            {t.hero.headlineEnd ? (
              <>
                <br />
                <span>{t.hero.headlineEnd}</span>
              </>
            ) : null}
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
