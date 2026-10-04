import { useLanguage } from '../context/LanguageContext'
import styles from './Features.module.css'

export default function Features() {
  const { t } = useLanguage()

  return (
    <section className={styles.section} id="features" aria-label="Features Section">
      <div className={styles.bgAccent} aria-hidden="true" />
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>⚡</span>
            <span>{t.features.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.features.title}</span>
            <br />
            <span className="gradient-text">{t.features.titleGradient}</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            {t.features.subtitle}
          </p>
        </div>

        {/* 14 Core Features Grid */}
        <div className={styles.grid}>
          {t.features.items.map((f, i) => (
            <article
              key={f.id}
              className={`${styles.card} animate-fadeInUp`}
              style={{ animationDelay: `${(i % 6) * 0.06}s` }}
            >
              <div className={styles.cardHeader}>
                <div
                  className={styles.cardIcon}
                  style={{
                    background: `${f.color}15`,
                    borderColor: `${f.color}35`,
                    color: f.color,
                  }}
                >
                  <span>{f.icon}</span>
                </div>
                <span className={styles.featureNumber}>#{f.id}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardLine} style={{ background: f.color }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
