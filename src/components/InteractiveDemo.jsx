import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { LIVE_SALONS } from '../data/liveSalons'
import styles from './InteractiveDemo.module.css'

export default function InteractiveDemo() {
  const { t, lang } = useLanguage()

  // Selected Salon (Default to Barbershop 26)
  const [selectedSalonId, setSelectedSalonId] = useState('barbershop26')
  const currentSalon = LIVE_SALONS.find(s => s.id === selectedSalonId) || LIVE_SALONS[0]

  // Booking states
  const [selectedStaff, setSelectedStaff] = useState(0)
  const [selectedService, setSelectedService] = useState(0)
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTime, setSelectedTime] = useState('11:30')
  const [booked, setBooked] = useState(false)

  const screenRef = useRef(null)

  // Quick dates for calendar simulation
  const dates = [
    { day: lang === 'he' ? 'היום' : lang === 'ar' ? 'اليوم' : 'Today', date: '04/10' },
    { day: lang === 'he' ? 'מחר' : lang === 'ar' ? 'غداً' : 'Tomorrow', date: '05/10' },
    { day: lang === 'he' ? 'יום ב׳' : lang === 'ar' ? 'الإثنين' : 'Mon', date: '06/10' },
    { day: lang === 'he' ? 'יום ג׳' : lang === 'ar' ? 'الثلاثاء' : 'Tue', date: '07/10' },
  ]

  const times = ['10:00', '11:30', '13:00', '15:15', '16:45', '18:00', '19:15', '20:30']

  const handleSalonChange = (salonId) => {
    setSelectedSalonId(salonId)
    setSelectedStaff(0)
    setSelectedService(0)
    setSelectedDateIndex(0)
    setSelectedTime('11:30')
    setBooked(false)
    if (screenRef.current) {
      screenRef.current.scrollTop = 0
    }
  }

  const handleBooking = (e) => {
    e.preventDefault()
    setBooked(true)
    if (screenRef.current) {
      screenRef.current.scrollTop = 0
    }
  }

  const activeStaff = currentSalon.staff[selectedStaff] || currentSalon.staff[0]
  const activeService = currentSalon.services[selectedService] || currentSalon.services[0]
  const th = currentSalon.theme

  // Inline CSS variables specific to the active salon's authentic ProCut theme
  const salonThemeStyles = {
    '--s-primary': th.primary,
    '--s-glow': th.primaryGlow,
    '--s-bg': th.bg,
    '--s-card': th.cardBg,
    '--s-border': th.border,
    '--s-badge-bg': th.badgeBg,
    '--s-badge-text': th.badgeText,
  }

  return (
    <section className={styles.section} id="demo" aria-label="Interactive Demo Section">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>🎮</span>
            <span>{t.demo.badge}</span>
          </div>
          <h2 className={`section-title ${styles.title}`}>
            <span>{t.demo.title}</span>
            <br />
            <span className="gradient-text">{t.demo.titleGradient}</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            {lang === 'ar'
              ? 'جرّب نظام الحجز الحي لـ 8 صالونات ومراكز تجميل رائدة تعمل بنظام ProCut الحقيقي'
              : lang === 'he'
              ? 'התנסו בסימולציית ההזמנה החיה של 8 עסקים מובילים שפועלים על מערכת ProCut'
              : 'Experience the live booking engine of 8 premier salons powered by ProCut'}
          </p>
        </div>

        {/* 8 Live Salons Selector Pills */}
        <div className={styles.salonSelectorWrapper}>
          <div className={styles.salonSelectorScroll} role="tablist" aria-label="Live Salons">
            {LIVE_SALONS.map(salon => {
              const isActive = salon.id === selectedSalonId
              return (
                <button
                  key={salon.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.salonPill} ${isActive ? styles.salonPillActive : ''}`}
                  style={isActive ? {
                    borderColor: salon.theme.primary,
                    boxShadow: `0 0 16px ${salon.theme.primaryGlow}`,
                    background: `linear-gradient(135deg, ${salon.theme.badgeBg}, rgba(255,255,255,0.03))`
                  } : {}}
                  onClick={() => handleSalonChange(salon.id)}
                >
                  <span className={styles.salonPillIcon}>{salon.icon}</span>
                  <div className={styles.salonPillText}>
                    <span className={styles.salonPillName} style={isActive ? { color: salon.theme.primary } : {}}>
                      {salon.name}
                    </span>
                    <span className={styles.salonPillTag}>{salon.category[lang] || salon.category.he}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Real Smartphone Mockup Container */}
        <div className={styles.screenWrapper}>
          <div className={styles.phoneFrame}>
            {/* Dynamic Island / iPhone Speaker Notch */}
            <div className={styles.dynamicIsland}>
              <div className={styles.notchCamera}></div>
            </div>

            {/* Scrollable Smartphone Viewport */}
            <div
              className={styles.phoneScreen}
              style={salonThemeStyles}
              ref={screenRef}
            >
              {/* CLEAN Cover Area - ZERO text on top of image as requested */}
              <div className={styles.coverArea}>
                <img
                  src={currentSalon.coverImg}
                  alt={currentSalon.name}
                  className={styles.coverImg}
                  loading="lazy"
                />
                <div className={styles.coverGradient} />

                {/* Top Action Buttons (Menu & Language) */}
                <div className={styles.topAppNav}>
                  <div className={styles.circleMenuBtn} aria-label="Menu">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="4" y1="7" x2="20" y2="7"></line>
                      <line x1="4" y1="12" x2="20" y2="12"></line>
                      <line x1="4" y1="17" x2="20" y2="17"></line>
                    </svg>
                  </div>
                  <div className={styles.circleMenuBtn} aria-label="Language">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Salon Profile Header overlapping cover with -mt */}
              <div className={styles.salonProfile}>
                <div className={styles.logoHalo}>
                  <span className={styles.logoAvatar}>{currentSalon.avatarImg}</span>
                </div>

                <div className={styles.profileText}>
                  <h3 className={styles.salonTitle}>{currentSalon.name}</h3>
                  <p className={styles.salonBio}>{currentSalon.desc[lang] || currentSalon.desc.he}</p>

                  <div className={styles.locationRow}>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.pinIcon}>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{currentSalon.location[lang] || currentSalon.location.he}</span>
                  </div>
                </div>

                {/* Social Circle Buttons - Exactly like ProCut */}
                <div className={styles.socialCirclesRow}>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialCircle} ${styles.circleWhatsApp}`}
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialCircle} ${styles.circleWaze}`}
                    aria-label="Waze"
                    title="Waze"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                  </a>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialCircle} ${styles.circleInstagram}`}
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialCircle} ${styles.circleTikTok}`}
                    aria-label="TikTok"
                    title="TikTok"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.8.1V9a6.33 6.33 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.27 8.27 0 0 0 4.76 1.5V7.12a4.83 4.83 0 0 1-1-.43z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Booking Flow Form - Scroll down to complete */}
              {!booked ? (
                <div className={styles.bookingContainer}>
                  {/* Step 1: Select Staff (בחרו ספר) */}
                  <section className={styles.stepSection}>
                    <div className={styles.sectionHeader}>
                      <h4 className={styles.procutSectionTitle}>
                        {lang === 'ar' ? 'اختر ' : lang === 'he' ? 'בחרו ' : 'Select '}
                        <span className={styles.primaryAccent}>
                          {currentSalon.staffTitle[lang] ? currentSalon.staffTitle[lang].replace(/בחרו |اختر |Select /g, '') : 'ספר'}
                        </span>
                      </h4>
                      <p className={styles.procutSectionSubtitle}>
                        {lang === 'ar' ? 'اختر مقدم الخدمة المفضل لديك' : lang === 'he' ? 'בחרו את הספר או נותן השירות המועדף עליכם.' : 'Choose your preferred specialist.'}
                      </p>
                    </div>

                    <div className={styles.staffGrid}>
                      {currentSalon.staff.map((st, i) => {
                        const isStActive = selectedStaff === i
                        return (
                          <button
                            key={st.id}
                            type="button"
                            className={`${styles.staffCard} ${isStActive ? styles.staffCardActive : ''}`}
                            onClick={() => setSelectedStaff(i)}
                          >
                            <div className={`${styles.staffAvatarHalo} ${isStActive ? styles.staffAvatarActive : ''}`}>
                              <span>{st.avatar}</span>
                            </div>
                            <span className={styles.staffName}>{st.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </section>

                  {/* Step 2: Select Service (בחרו שירות) */}
                  <section className={styles.stepSection}>
                    <div className={styles.sectionHeader}>
                      <h4 className={styles.procutSectionTitle}>
                        {lang === 'ar' ? 'اختر ' : lang === 'he' ? 'בחרו ' : 'Select '}
                        <span className={styles.primaryAccent}>
                          {lang === 'ar' ? 'الخدمة' : lang === 'he' ? 'שירות' : 'Service'}
                        </span>
                      </h4>
                      <p className={styles.procutSectionSubtitle}>
                        {lang === 'ar' ? 'تحدد هذه الخطوة مدة الخدمة وسعرها.' : lang === 'he' ? 'בחירה זו קובעת את משך הטיפול ואת המחיר.' : 'This sets treatment duration and price.'}
                      </p>
                    </div>

                    <div className={styles.servicesGrid}>
                      {currentSalon.services.map((srv, i) => {
                        const isSrvActive = selectedService === i
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            className={`${styles.serviceCard} ${isSrvActive ? styles.serviceCardActive : ''}`}
                            onClick={() => setSelectedService(i)}
                          >
                            <div className={styles.serviceTopRow}>
                              <div className={styles.serviceMetaGroup}>
                                <div className={styles.serviceIconBox}>
                                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="6" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                                    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                                    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                                  </svg>
                                </div>
                                <div>
                                  <div className={styles.serviceName}>{srv.name}</div>
                                  <div className={styles.serviceTime}>{srv.time}</div>
                                </div>
                              </div>
                              <div className={styles.servicePrice}>{srv.price}</div>
                            </div>
                            <p className={styles.serviceDesc}>{srv.desc}</p>
                          </button>
                        )
                      })}
                    </div>
                  </section>

                  {/* Step 3: Date & Time Picker Card (קביעת תור) */}
                  <section className={styles.bookingCard}>
                    <div className={styles.bookingCardHeader}>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" className={styles.cardHeaderIcon}>
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <h4 className={styles.bookingCardTitle}>
                        {lang === 'ar' ? 'حجز موعد' : lang === 'he' ? 'קביעת תור' : 'Schedule Appointment'}
                      </h4>
                    </div>

                    {/* Month Navigator */}
                    <div className={styles.monthNavRow}>
                      <button type="button" className={styles.arrowBtn}>‹</button>
                      <span className={styles.monthLabel}>
                        {lang === 'ar' ? 'أكتوبر 2026' : lang === 'he' ? 'אוקטובר 2026' : 'October 2026'}
                      </span>
                      <button type="button" className={styles.arrowBtn}>›</button>
                    </div>

                    {/* Date Chips Carousel */}
                    <div className={styles.dateChipsRow}>
                      {dates.map((d, i) => {
                        const isDateActive = selectedDateIndex === i
                        return (
                          <button
                            key={i}
                            type="button"
                            className={`${styles.dateChip} ${isDateActive ? styles.dateChipActive : ''}`}
                            onClick={() => setSelectedDateIndex(i)}
                          >
                            <span className={styles.dateDay}>{d.day}</span>
                            <span className={styles.dateNum}>{d.date}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Time Slot Label */}
                    <div className={styles.timeSectionHeader}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className={styles.clockIcon}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{lang === 'ar' ? 'اختر الوقت' : lang === 'he' ? 'בחרו שעה' : 'Select Time'}</span>
                    </div>

                    {/* 4-column Time Slots Grid */}
                    <div className={styles.timeSlotsGrid}>
                      {times.map((tm, i) => {
                        const isTimeActive = selectedTime === tm
                        return (
                          <button
                            key={i}
                            type="button"
                            className={`${styles.timeSlotBtn} ${isTimeActive ? styles.timeSlotBtnActive : ''}`}
                            onClick={() => setSelectedTime(tm)}
                          >
                            {tm}
                          </button>
                        )
                      })}
                    </div>

                    {/* Form Inputs & Submit Button */}
                    <form onSubmit={handleBooking} className={styles.procutForm}>
                      <div className={styles.formInputGroup}>
                        <label className={styles.fieldLabel}>
                          {lang === 'ar' ? 'الاسم الكامل' : lang === 'he' ? 'שם מלא' : 'Full Name'}
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="text"
                            required
                            defaultValue="ישראל ישראלי"
                            placeholder="ישראל ישראלי"
                            className={styles.procutInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formInputGroup}>
                        <label className={styles.fieldLabel}>
                          {lang === 'ar' ? 'رقم الهاتف' : lang === 'he' ? 'טלפון' : 'Phone Number'}
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="tel"
                            required
                            defaultValue="050-1234567"
                            placeholder="050-1234567"
                            className={styles.procutInput}
                            dir="ltr"
                          />
                        </div>
                      </div>

                      {/* Official ProCut Button: קבלת קוד אימות */}
                      <button
                        type="submit"
                        className={styles.procutSubmitBtn}
                      >
                        {lang === 'ar'
                          ? `تأكيد الموعد (${activeService.price})`
                          : lang === 'he'
                          ? `קבלת קוד אימות (${activeService.price})`
                          : `Confirm Booking (${activeService.price})`}
                      </button>
                    </form>
                  </section>
                </div>
              ) : (
                /* Instant Booking Success State */
                <div className={styles.successScreen}>
                  <div className={styles.successBadgeCircle}>✓</div>
                  <h3 className={styles.successTitle}>
                    {lang === 'ar' ? 'تم تأكيد موعدك بنجاح!' : lang === 'he' ? 'התור נקבע בהצלחה!' : 'Booking Confirmed!'}
                  </h3>
                  <p className={styles.successSubtitle}>
                    {lang === 'ar'
                      ? 'تم إرسال رسالة SMS وتذكير أوتوماتيكي إلى هاتفك.'
                      : lang === 'he'
                      ? 'הודעת SMS ותזכורת נשלחו אוטומטית למספר שלך.'
                      : 'An automated SMS confirmation has been sent.'}
                  </p>

                  <div className={styles.receiptCard}>
                    <div className={styles.receiptRow}>
                      <span>{lang === 'ar' ? 'الصالون:' : lang === 'he' ? 'עסק:' : 'Salon:'}</span>
                      <strong>{currentSalon.name}</strong>
                    </div>
                    <div className={styles.receiptRow}>
                      <span>{lang === 'ar' ? 'الخدمة:' : lang === 'he' ? 'טיפול:' : 'Service:'}</span>
                      <strong>{activeService.name}</strong>
                    </div>
                    <div className={styles.receiptRow}>
                      <span>{lang === 'ar' ? 'مقدم الخدمة:' : lang === 'he' ? 'איש צוות:' : 'Specialist:'}</span>
                      <strong>{activeStaff.name}</strong>
                    </div>
                    <div className={styles.receiptRow}>
                      <span>{lang === 'ar' ? 'الموعد:' : lang === 'he' ? 'מועד:' : 'Schedule:'}</span>
                      <strong>{dates[selectedDateIndex].day} ({dates[selectedDateIndex].date}) {selectedTime}</strong>
                    </div>
                    <div className={styles.receiptRow}>
                      <span>{lang === 'ar' ? 'المبلغ:' : lang === 'he' ? 'סה"כ:' : 'Total:'}</span>
                      <strong style={{ color: th.primary }}>{activeService.price}</strong>
                    </div>
                  </div>

                  <div className={styles.successActions}>
                    <button
                      type="button"
                      className={styles.resetBtn}
                      onClick={() => setBooked(false)}
                    >
                      🔄 {lang === 'ar' ? 'حجز موعد إضافي' : lang === 'he' ? 'קבע תור נוסף לדוגמה' : 'Book Another Appointment'}
                    </button>
                  </div>
                </div>
              )}

              {/* Official ProCut Footer inside the app */}
              <div className={styles.appFooter}>
                <span>© 2026 · Powered by <strong className={styles.procutBranding}>ProCut</strong></span>
              </div>
            </div>

            {/* Smartphone Bottom Home Bar */}
            <div className={styles.homeIndicatorBar}></div>
          </div>
        </div>

        {/* External direct link badge outside the phone for credibility */}
        <div className={styles.outerLiveLinkArea}>
          <a
            href={currentSalon.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outerLiveBadge}
          >
            <span>🌐</span>
            <span>
              {lang === 'ar' ? `زيارة الموقع الحي الأصلي: procut.me/${currentSalon.slug}` : lang === 'he' ? `ביקור באתר המקורי: procut.me/${currentSalon.slug}` : `Visit Live Website: procut.me/${currentSalon.slug}`}
            </span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
