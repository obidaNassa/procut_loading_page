import { useState } from 'react'
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

  // Quick dates for calendar simulation
  const dates = [
    { day: lang === 'he' ? 'היום' : lang === 'ar' ? 'اليوم' : 'Today', date: '04/10' },
    { day: lang === 'he' ? 'מחר' : lang === 'ar' ? 'غداً' : 'Tomorrow', date: '05/10' },
    { day: lang === 'he' ? 'יום ב׳' : lang === 'ar' ? 'الإثنين' : 'Mon', date: '06/10' },
    { day: lang === 'he' ? 'יום ג׳' : lang === 'ar' ? 'الثلاثاء' : 'Tue', date: '07/10' },
  ]

  const times = ['10:00', '11:30', '13:00', '15:15', '16:45', '18:00']

  const handleSalonChange = (salonId) => {
    setSelectedSalonId(salonId)
    setSelectedStaff(0)
    setSelectedService(0)
    setSelectedDateIndex(0)
    setSelectedTime('11:30')
    setBooked(false)
  }

  const handleBooking = (e) => {
    e.preventDefault()
    setBooked(true)
  }

  const activeStaff = currentSalon.staff[selectedStaff] || currentSalon.staff[0]
  const activeService = currentSalon.services[selectedService] || currentSalon.services[0]

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
                  onClick={() => handleSalonChange(salon.id)}
                >
                  <span className={styles.salonPillIcon}>{salon.icon}</span>
                  <div className={styles.salonPillText}>
                    <span className={styles.salonPillName}>{salon.name}</span>
                    <span className={styles.salonPillTag}>{salon.category[lang] || salon.category.he}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Live Simulation Phone Frame */}
        <div className={styles.screenWrapper}>
          <div className={styles.phoneFrame}>
            <div className={styles.phoneSpeaker} />

            <div className={styles.phoneScreen}>
              {/* ProCut Cover Banner */}
              <div className={styles.coverArea}>
                <img
                  src={currentSalon.coverImg}
                  alt={currentSalon.name}
                  className={styles.coverImg}
                  loading="lazy"
                />
                <div className={styles.coverGradient} />

                {/* Top Nav Bar inside app */}
                <div className={styles.topAppNav}>
                  <div className={styles.appMenuIcon} aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.liveIndicator}>
                    <span className={styles.liveDot}></span>
                    <span>ProCut Live</span>
                  </div>
                </div>

                {/* External Link directly to the real live website */}
                <a
                  href={currentSalon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directLiveLink}
                  title="Open real site at procut.me"
                >
                  <span>{lang === 'ar' ? 'عرض الموقع الحي' : lang === 'he' ? 'פתח דף מקורי באתר' : 'Open Live Site'}</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Salon Profile Header */}
              <div className={styles.salonProfile}>
                <div className={styles.logoHalo}>
                  <span className={styles.logoAvatar}>{currentSalon.avatarImg}</span>
                </div>

                <div className={styles.profileText}>
                  <h3 className={styles.salonTitle}>{currentSalon.name}</h3>
                  <span className={styles.salonTagBadge}>{currentSalon.category[lang] || currentSalon.category.he}</span>
                  <p className={styles.salonBio}>{currentSalon.desc[lang] || currentSalon.desc.he}</p>
                </div>

                {/* Social & Contact Actions */}
                <div className={styles.socialBar}>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.socialWhatsApp}`}
                    aria-label="WhatsApp"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.socialWaze}`}
                    aria-label="Waze"
                  >
                    <span>🧭</span>
                    <span>Waze</span>
                  </a>
                  <a
                    href={currentSalon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.socialInstagram}`}
                    aria-label="Instagram"
                  >
                    <span>📸</span>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Booking Flow Form */}
              {!booked ? (
                <div className={styles.bookingContainer}>
                  {/* Step 1: Select Staff */}
                  <div className={styles.stepSection}>
                    <div className={styles.stepHeaderRow}>
                      <span className={styles.stepNumber}>1</span>
                      <h4 className={styles.stepTitle}>
                        {currentSalon.staffTitle[lang] || currentSalon.staffTitle.he}
                      </h4>
                    </div>

                    <div className={styles.staffRow}>
                      {currentSalon.staff.map((st, i) => (
                        <button
                          key={st.id}
                          type="button"
                          className={`${styles.staffCard} ${selectedStaff === i ? styles.staffCardActive : ''}`}
                          onClick={() => setSelectedStaff(i)}
                        >
                          <div className={styles.staffAvatarCircle}>
                            <span>{st.avatar}</span>
                          </div>
                          <span className={styles.staffName}>{st.name}</span>
                          <span className={styles.staffRole}>{st.role}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Service */}
                  <div className={styles.stepSection}>
                    <div className={styles.stepHeaderRow}>
                      <span className={styles.stepNumber}>2</span>
                      <h4 className={styles.stepTitle}>
                        {lang === 'ar' ? 'בחרו שירות / اختر الخدمة' : lang === 'he' ? 'בחרו שירות' : 'Select Service'}
                      </h4>
                    </div>

                    <div className={styles.servicesList}>
                      {currentSalon.services.map((srv, i) => (
                        <div
                          key={srv.id}
                          className={`${styles.serviceCard} ${selectedService === i ? styles.serviceCardActive : ''}`}
                          onClick={() => setSelectedService(i)}
                        >
                          <div className={styles.serviceMain}>
                            <div className={styles.serviceNameRow}>
                              <span className={styles.serviceIcon}>✂️</span>
                              <div>
                                <span className={styles.serviceName}>{srv.name}</span>
                                <span className={styles.serviceTime}>{srv.time}</span>
                              </div>
                            </div>
                            <span className={styles.servicePrice}>{srv.price}</span>
                          </div>
                          <p className={styles.serviceDesc}>{srv.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Calendar & Times */}
                  <div className={styles.stepSection}>
                    <div className={styles.stepHeaderRow}>
                      <span className={styles.stepNumber}>3</span>
                      <h4 className={styles.stepTitle}>
                        {lang === 'ar' ? 'קביעת תור / حدد الموعد' : lang === 'he' ? 'קביעת תור' : 'Choose Date & Time'}
                      </h4>
                    </div>

                    {/* Date Chips */}
                    <div className={styles.dateChipsRow}>
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.dateChip} ${selectedDateIndex === i ? styles.dateChipActive : ''}`}
                          onClick={() => setSelectedDateIndex(i)}
                        >
                          <span className={styles.dateDay}>{d.day}</span>
                          <span className={styles.dateNum}>{d.date}</span>
                        </button>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className={styles.timeChipsGrid}>
                      {times.map((tm, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.timeChip} ${selectedTime === tm ? styles.timeChipActive : ''}`}
                          onClick={() => setSelectedTime(tm)}
                        >
                          {tm}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form & Submit */}
                  <form onSubmit={handleBooking} className={styles.bookingForm}>
                    <div className={styles.formRow}>
                      <input
                        type="text"
                        required
                        defaultValue="ישראל ישראלי"
                        placeholder={lang === 'ar' ? 'الاسم الكامل' : lang === 'he' ? 'שם מלא' : 'Full Name'}
                        className={styles.inputField}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <input
                        type="tel"
                        required
                        defaultValue="050-1234567"
                        placeholder={lang === 'ar' ? 'رقم الهاتف' : lang === 'he' ? 'מספר טלפון' : 'Phone Number'}
                        className={styles.inputField}
                        dir="ltr"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`btn btn-primary ${styles.submitBookingBtn}`}
                      style={{
                        background: `linear-gradient(135deg, ${currentSalon.accentColor}, #6366f1)`
                      }}
                    >
                      <span>⚡</span>
                      <span>
                        {lang === 'ar'
                          ? `تأكيد حجز الموعد (${activeService.price})`
                          : lang === 'he'
                          ? `קבלת קוד אימות וסגירת תור (${activeService.price})`
                          : `Confirm Booking (${activeService.price})`}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Instant Booking Success State */
                <div className={styles.successScreen}>
                  <div className={styles.successIcon}>🎉</div>
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
                      <strong style={{ color: currentSalon.accentColor }}>{activeService.price}</strong>
                    </div>
                  </div>

                  <div className={styles.successActions}>
                    <button
                      type="button"
                      className={`btn btn-outline ${styles.resetBtn}`}
                      onClick={() => setBooked(false)}
                    >
                      🔄 {lang === 'ar' ? 'حجز موعد إضافي للدמו' : lang === 'he' ? 'קבע תור נוסף לדוגמה' : 'Book Another Appointment'}
                    </button>

                    <a
                      href={currentSalon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-primary ${styles.visitRealBtn}`}
                    >
                      🌐 {lang === 'ar' ? 'زيارة الرابط الأصلي المباشر' : lang === 'he' ? 'עבור לדף המקורי של העסק' : 'Visit Live Webpage'}
                    </a>
                  </div>
                </div>
              )}

              {/* Official ProCut Footer inside the app */}
              <div className={styles.appFooter}>
                <span>Powered by</span>
                <strong className={styles.procutBranding}>ProCut.me</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
