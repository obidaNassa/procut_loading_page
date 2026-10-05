import { useLanguage } from '../context/LanguageContext'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useLanguage()

  const colors = ['var(--brand-1)', 'var(--brand-2)', '#f43f5e', '#a855f7', '#fb923c', '#22d3ee']

  return (
    <section className={styles.section} id="testimonials" aria-label="Testimonials">
      <div className="container">
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>💬</span>
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.testimonials.title}</span>
            <br />
            <span className="gradient-text">{t.testimonials.titleGradient}</span>
          </h2>
        </div>

        {/* Stats Row before Feedbacks */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>20+</span>
            <span className={styles.statLabel}>{t.hero.statBusinesses}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>10K+</span>
            <span className={styles.statLabel}>{t.hero.statAppointments}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>99%</span>
            <span className={styles.statLabel}>{t.hero.statSatisfaction}</span>
          </div>
        </div>

        <div className={styles.grid}>
          {t.testimonials.items.map((item, i) => (
            <blockquote
              key={i}
              className={`${styles.card} animate-fadeInUp`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.stars}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className={styles.quote}>"{item.text}"</p>
              <footer className={styles.author}>
                <span className={styles.authorAvatar}>{item.avatar}</span>
                <div>
                  <div className={styles.authorName}>{item.name}</div>
                  <div className={styles.authorRole}>{item.role}</div>
                </div>
              </footer>
              <div className={styles.cardAccent} style={{ background: colors[i % colors.length] }} />
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
