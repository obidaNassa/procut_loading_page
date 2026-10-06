import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getWhatsAppUrl } from '../constants'
import styles from './Pricing.module.css'

export default function Pricing() {
  const { t, lang } = useLanguage()

  // Limited SMS bundle selection (0 = 1K, 1 = 2K, 2 = 3K, 3 = 5K)
  const [selectedSmsBundle, setSelectedSmsBundle] = useState(0)

  // Unlimited SMS staff selection (0 = 1 staff, 1 = 2 staff, 2 = 3+ staff)
  const [selectedStaffTier, setSelectedStaffTier] = useState(0) // Default to 1 staff (119.99 ₪)

  const smsBundles = [
    { count: '1,000 SMS', extra: '+20 ₪', total: '99.99 ₪' },
    { count: '2,000 SMS', extra: '+40 ₪', total: '119.99 ₪' },
    { count: '3,000 SMS', extra: '+60 ₪', total: '139.99 ₪' },
    { count: '5,000 SMS', extra: '+100 ₪', total: '179.99 ₪' },
  ]

  const staffTiers = [
    { label: t.pricing.staffOption1, price: '119.99' },
    { label: t.pricing.staffOption2, price: '159.99' },
    { label: t.pricing.staffOption3, price: '199.99' },
  ]

  const waBaseUrl = (planTitle) => {
    const msg = lang === 'ar'
      ? `مرحباً، أود الاشتراك في ${planTitle} لنظام ProCut والبدء بالشهر المجاني.`
      : lang === 'he'
      ? `שלום, אני מעוניין להצטרף ל-${planTitle} של ProCut ולהפעיל חודש ניסיון חינם.`
      : `Hello, I'm interested in the ${planTitle} of ProCut and starting the free month trial.`
    return getWhatsAppUrl(msg)
  }

  return (
    <section className={styles.section} id="pricing" aria-label="Pricing and Packages">
      <div className={styles.bgBlob} aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>💎</span>
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.pricing.title}</span>
            <br />
            <span className="gradient-text">{t.pricing.titleGradient}</span>
          </h2>

          {/* CRITICAL PROMINENT ALERT BANNER */}
          <div className={styles.prominentBanner}>
            <div className={styles.bannerGlow} />
            <div className={styles.bannerContent}>
              <span className={styles.bannerIcon}>✨</span>
              <p className={styles.bannerText}>{t.pricing.bannerAlert}</p>
            </div>
          </div>
        </div>

        {/* 3 Main Packages Grid */}
        <div className={styles.plansGrid}>
          {/* PACKAGE 1: Basic Plan (79.99 ₪) */}
          <article className={`${styles.planCard} ${styles.planBasic}`} id="plan-basic">
            <div className={styles.planTop}>
              <div className={styles.planBadge}>{t.pricing.plan1Name}</div>
              <h3 className={styles.planName}>{t.pricing.plan1Name}</h3>
              <p className={styles.planTagline}>{t.pricing.plan1Tagline}</p>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.priceMain}>
                <span className={styles.currency}>₪</span>
                <span className={styles.priceNum}>79.99</span>
                <span className={styles.pricePeriod}>{t.pricing.plan1Period}</span>
              </div>
              <p className={styles.priceNote}>
                {lang === 'ar' ? 'تشمل 100% من ميزات النظام + إشعارات' : lang === 'he' ? 'כולל 100% מתכונות המערכת + התראות' : 'Includes 100% features + push alerts'}
              </p>
            </div>

            <div className={styles.featureHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{t.pricing.plan1Feature1}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{t.pricing.plan1Feature2}</span>
              </div>
              <div className={`${styles.highlightItem} ${styles.noSmsItem}`}>
                <span className={styles.infoIcon}>ℹ️</span>
                <span>{t.pricing.plan1Feature3}</span>
              </div>
            </div>

            <a
              href={waBaseUrl(t.pricing.plan1Name)}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary btn-lg ${styles.planBtn} ${styles.planBtnGlow}`}
              id="cta-plan-basic"
            >
              🎁 {t.pricing.plan1Cta}
            </a>
          </article>

          {/* PACKAGE 2: Limited SMS Plan (POPULAR) */}
          <article className={`${styles.planCard} ${styles.planLimited}`} id="plan-limited">
            <div className={styles.popularBadge}>{t.pricing.plan3Popular}</div>
            <div className={styles.planTop}>
              <div className={`${styles.planBadge} ${styles.badgeCyan}`}>SMS BUNDLE</div>
              <h3 className={styles.planName}>{t.pricing.plan2Name}</h3>
              <p className={styles.planTagline}>{t.pricing.plan2Tagline}</p>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.priceMain}>
                <span className={styles.currency}>₪</span>
                <span className={styles.priceNum}>{smsBundles[selectedSmsBundle].total.replace(' ₪', '')}</span>
                <span className={styles.pricePeriod}>{t.pricing.plan1Period}</span>
              </div>
              <p className={styles.priceNote}>
                {lang === 'ar'
                  ? `(79.99 ₪ أساسي ${smsBundles[selectedSmsBundle].extra})`
                  : lang === 'he'
                  ? `(79.99 ₪ בסיס ${smsBundles[selectedSmsBundle].extra})`
                  : `(79.99 ₪ base ${smsBundles[selectedSmsBundle].extra})`}
              </p>
            </div>

            {/* Interactive SMS bundle picker */}
            <div className={styles.interactiveBox}>
              <label className={styles.interactiveLabel}>
                {t.pricing.plan2CalculatorTitle}
              </label>
              <div className={styles.bundleOptions}>
                {smsBundles.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.bundleBtn} ${selectedSmsBundle === i ? styles.bundleBtnActive : ''}`}
                    onClick={() => setSelectedSmsBundle(i)}
                  >
                    <span className={styles.bundleCount}>{b.count}</span>
                    <span className={styles.bundleExtra}>{b.extra}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.featureHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{t.pricing.plan1Feature1}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{t.pricing.plan1Feature2}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{smsBundles[selectedSmsBundle].count} SMS {lang === 'ar' ? 'شهرياً' : lang === 'he' ? 'בחודש' : '/ month'}</span>
              </div>
            </div>

            <a
              href={waBaseUrl(`${t.pricing.plan2Name} (${smsBundles[selectedSmsBundle].count})`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary btn-lg ${styles.planBtn} ${styles.planBtnGlow}`}
              id="cta-plan-limited"
            >
              {t.pricing.plan2Cta}
            </a>
          </article>

          {/* PACKAGE 3: Unlimited SMS Plan */}
          <article className={`${styles.planCard} ${styles.planUnlimited}`} id="plan-unlimited">
            <div className={styles.planTop}>
              <div className={`${styles.planBadge} ${styles.badgeInfinity}`}>
                <span>∞ UNLIMITED</span>
              </div>
              <h3 className={styles.planName}>{t.pricing.plan3Name}</h3>
              <p className={styles.planTagline}>{t.pricing.plan3Tagline}</p>
            </div>

            {/* Price Block (Matches Plan 2 position) */}
            <div className={styles.priceBlock}>
              <div className={styles.priceMain}>
                <span className={styles.currency}>₪</span>
                <span className={`${styles.priceNum} ${styles.priceNumGlow}`}>
                  {staffTiers[selectedStaffTier].price}
                </span>
                <span className={styles.pricePeriod}>{t.pricing.plan1Period}</span>
              </div>
              <p className={styles.priceNote}>
                {lang === 'ar'
                  ? 'رسائل SMS وإشعارات بلا حدود لجميع أفراد الطاقم'
                  : lang === 'he'
                  ? 'הודעות SMS והתראות ללא הגבלה לכל אנשי הצוות'
                  : 'Unlimited SMS & notifications for all staff members'}
              </p>
            </div>

            {/* Staff Tier Selector - Styled identically to SMS bundle */}
            <div className={styles.interactiveBox}>
              <label className={styles.interactiveLabel}>
                {t.pricing.plan3StaffToggleLabel}
              </label>
              <div className={styles.staffBundleOptions}>
                {staffTiers.map((st, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.staffBundleBtn} ${selectedStaffTier === i ? styles.staffBundleBtnActive : ''}`}
                    onClick={() => setSelectedStaffTier(i)}
                  >
                    <span className={styles.staffBundleCount}>{st.label}</span>
                    <span className={styles.staffBundlePrice}>₪{st.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.featureHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.checkIconAccent}>✓</span>
                <span>{t.pricing.plan1Feature1}</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.checkIconAccent}>✓</span>
                <span><strong>SMS ללא הגבלה (Unlimited)</strong></span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.checkIconAccent}>✓</span>
                <span>{staffTiers[selectedStaffTier].label}</span>
              </div>
            </div>

            <a
              href={waBaseUrl(`${t.pricing.plan3Name} (${staffTiers[selectedStaffTier].label})`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary btn-lg ${styles.planBtn} ${styles.planBtnGlow}`}
              id="cta-plan-unlimited"
            >
              🚀 {t.pricing.plan3Cta}
            </a>
          </article>
        </div>

        {/* Guaranteed 100% Features Checklist Box */}
        <div className={styles.featuresChecklistBox}>
          <h4 className={styles.checklistTitle}>{t.pricing.allFeaturesIncludedHeader}</h4>
          <div className={styles.checklistGrid}>
            {t.features.items.map(f => (
              <div key={f.id} className={styles.checklistItem}>
                <span className={styles.checkBadge}>✓</span>
                <span className={styles.checkText}>{f.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Free trial footer reminder */}
        <div className={styles.freeTrialNotice}>
          <span>{t.pricing.freeMonthNote}</span>
        </div>
      </div>
    </section>
  )
}
