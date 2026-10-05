import { useLanguage } from '../context/LanguageContext'
import styles from './DeepDive.module.css'

export default function DeepDive() {
  const { t } = useLanguage()

  return (
    <section className={styles.section} id="deep-dive" aria-label="Expanded Features Deep-Dive">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>🔬</span>
            <span>{t.deepDive.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.deepDive.title}</span>
            <br />
            <span className="gradient-text">{t.deepDive.titleGradient}</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            {t.deepDive.subtitle}
          </p>
        </div>

        {/* 3 Pillars Deep-Dive Cards */}
        <div className={styles.pillarsGrid}>
          {/* Card 1: Multi-Channel Notifications */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <div className={styles.iconCircle} style={{ background: 'rgba(99,102,241,0.15)', borderColor: 'var(--brand-1)' }}>
                <span>🔔</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.deepDive.card1Title}</h3>
            </div>
            <p className={styles.pillarDesc}>{t.deepDive.card1Desc}</p>
            
            {/* Visual simulation inside card */}
            <div className={styles.sampleNotif}>
              <div className={styles.sampleNotifHeader}>
                <span className={styles.sampleNotifLogo}>✂️ ProCut</span>
                <span className={styles.sampleNotifTime}>{t.deepDive.sampleNotifTime}</span>
              </div>
              <div className={styles.sampleNotifBody}>
                <strong>{t.deepDive.sampleNotifTitle}</strong>
                <p>{t.deepDive.sampleNotifDesc}</p>
              </div>
              <div className={styles.sampleNotifActions}>
                <button type="button" className={styles.notifBtnConfirm}>{t.deepDive.sampleNotifConfirm}</button>
                <button type="button" className={styles.notifBtnReschedule}>{t.deepDive.sampleNotifReschedule}</button>
              </div>
            </div>
          </div>

          {/* Card 2: Re-allocation & Waitlist */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <div className={styles.iconCircle} style={{ background: 'rgba(6,182,212,0.15)', borderColor: 'var(--brand-2)' }}>
                <span>⚡</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.deepDive.card2Title}</h3>
            </div>
            <p className={styles.pillarDesc}>{t.deepDive.card2Desc}</p>

            <div className={styles.flowBox}>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNum}>1</span>
                <span>{t.deepDive.flowStep1}</span>
              </div>
              <div className={styles.flowArrow}>↓</div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNum}>2</span>
                <span>{t.deepDive.flowStep2}</span>
              </div>
              <div className={styles.flowArrow}>↓</div>
              <div className={`${styles.flowStep} ${styles.flowSuccess}`}>
                <span className={styles.flowStepNum}>3</span>
                <span>{t.deepDive.flowStep3}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Privacy & Roles */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <div className={styles.iconCircle} style={{ background: 'rgba(244,63,94,0.15)', borderColor: '#f43f5e' }}>
                <span>👥</span>
              </div>
              <h3 className={styles.pillarTitle}>{t.deepDive.card3Title}</h3>
            </div>
            <p className={styles.pillarDesc}>{t.deepDive.card3Desc}</p>

            <div className={styles.roleBox}>
              <div className={styles.roleItem}>
                <span className={styles.roleAvatar}>👑</span>
                <div className={styles.roleInfo}>
                  <strong>{t.deepDive.roleOwnerTitle}</strong>
                  <span>{t.deepDive.roleOwnerDesc}</span>
                </div>
              </div>
              <div className={styles.roleDivider} />
              <div className={styles.roleItem}>
                <span className={styles.roleAvatar}>✂️</span>
                <div className={styles.roleInfo}>
                  <strong>{t.deepDive.roleStaffTitle}</strong>
                  <span>{t.deepDive.roleStaffDesc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
