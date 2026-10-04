import { useLanguage } from '../context/LanguageContext'
import styles from './Recommendations.module.css'

export default function Recommendations() {
  const { t } = useLanguage()

  return (
    <section className={styles.section} id="recommendations" aria-label="AI and Expert Recommendations">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>💡</span>
            <span>{t.recommendations.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.recommendations.title}</span>
            <br />
            <span className="gradient-text">{t.recommendations.titleGradient}</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            {t.recommendations.subtitle}
          </p>
        </div>

        {/* 3 Smart Strategies Grid */}
        <div className={styles.grid}>
          {t.recommendations.items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.benefitTag}>
                <span>📈 {item.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
