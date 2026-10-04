import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    icon: '💬',
    title: 'צרו קשר בוואטסאפ',
    desc: 'שלחו לנו הודעה עם שם העסק, הסניפים שלכם ואנחנו נשלח לכם הצעה תוך שעה.',
    color: '#6366f1',
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'הגדרה אישית',
    desc: 'אנחנו מגדירים את המערכת עבורכם — שירותים, מחירים, ספרים, שעות פעילות.',
    color: '#06b6d4',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'עולים לאוויר',
    desc: 'דף הנחיתה שלכם עולה לאינטרנט — שתפו ללקוחות ובידאו את היומן מתמלא.',
    color: '#f43f5e',
  },
  {
    num: '04',
    icon: '📈',
    title: 'נהלו ותדעו הכל',
    desc: 'מעקב אחר הכנסות, לקוחות, ביטולים — כל זאת מהממשק הנוח שלנו, 24/7.',
    color: '#22d3ee',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works" aria-label="How It Works">
      <div className="container">
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>⚡</span> איך זה עובד
          </div>
          <h2 className={`section-title ${styles.title}`}>
            מה<span className="gradient-text">קורה</span> כשמצטרפים?
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            תהליך פשוט, מהיר ומלווה — מההרשמה ועד לאתר שמביא לקוחות.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepWrapper}>
              <div
                className={styles.stepCard}
                style={{ '--step-color': step.color }}
              >
                <div className={styles.stepNum} style={{ color: step.color }}>
                  {step.num}
                </div>
                <div className={styles.stepIconWrap} style={{ background: `${step.color}18` }}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <div className={styles.connectorLine} />
                  <div className={styles.connectorDot} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
