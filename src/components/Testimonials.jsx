import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)

  const colors = ['var(--brand-1)', 'var(--brand-2)', '#f43f5e', '#a855f7', '#fb923c', '#22d3ee']
  const visibleItems = showAll ? t.testimonials.items : t.testimonials.items.slice(0, 3)

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
          {visibleItems.map((item, i) => (
            <blockquote
              key={i}
              className={`${styles.card} animate-fadeInUp`}
              style={{ animationDelay: `${(i % 3) * 0.08}s` }}
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

        {t.testimonials.items.length > 3 && (
          <div className={styles.showMoreContainer}>
            <button 
              className={`btn btn-outline ${styles.showMoreBtn}`}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (t.testimonials.showLess || 'Show less') : t.testimonials.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
