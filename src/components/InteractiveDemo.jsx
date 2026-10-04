import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './InteractiveDemo.module.css'

export default function InteractiveDemo() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('customer') // 'customer' or 'salon'

  // Customer booking state
  const [selectedService, setSelectedService] = useState(0)
  const [selectedStaff, setSelectedStaff] = useState(0)
  const [selectedTime, setSelectedTime] = useState('11:30')
  const [booked, setBooked] = useState(false)

  const servicesList = [
    {
      id: 0,
      icon: '✂️',
      name: lang === 'ar' ? 'قص شعر ملكي + تشذيب لحية' : lang === 'he' ? 'תספורת VIP + עיצוב זקן' : 'VIP Haircut & Beard',
      duration: '45 min',
      price: '₪90',
    },
    {
      id: 1,
      icon: '💅',
      name: lang === 'ar' ? 'جل أظافر وباديكير احترافي' : lang === 'he' ? 'מניקור ג\'ל ובניית ציפורניים' : 'Gel Nails & Manicure',
      duration: '60 min',
      price: '₪140',
    },
    {
      id: 2,
      icon: '💆',
      name: lang === 'ar' ? 'جلسة تنظيف وترطيب بشرة' : lang === 'he' ? 'טיפול פנים הידרציה והזנה' : 'Facial Cleansing & Glow',
      duration: '50 min',
      price: '₪180',
    },
  ]

  const staffList = [
    { id: 0, name: lang === 'ar' ? 'أحمد كمال (خبير حلاقة)' : lang === 'he' ? 'דניאל (ספר מומחה)' : 'Alex (Master Barber)', avatar: '💈' },
    { id: 1, name: lang === 'ar' ? 'ريما سالم (أخصائية أظافر)' : lang === 'he' ? 'שני (מומחית ציפורניים)' : 'Emma (Nail Artist)', avatar: '💅' },
    { id: 2, name: lang === 'ar' ? 'نور علي (أخصائية بشرة)' : lang === 'he' ? 'מאיה (קוסמטיקאית)' : 'Sophia (Esthetician)', avatar: '💆' },
  ]

  const times = ['10:00', '11:30', '13:00', '15:15', '17:00', '18:30']

  const handleBooking = () => {
    setBooked(true)
    setTimeout(() => {
      // Keep booked state visible for feedback
    }, 500)
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
            {t.demo.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabContainer}>
          <div className={styles.tabSwitcher}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'customer' ? styles.tabBtnActive : ''}`}
              onClick={() => { setActiveTab('customer'); setBooked(false); }}
            >
              <span>📱</span>
              <span>{t.demo.tabCustomer}</span>
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'salon' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('salon')}
            >
              <span>📊</span>
              <span>{t.demo.tabSalon}</span>
            </button>
          </div>
        </div>

        {/* Interactive Screen Container */}
        <div className={styles.screenWrapper}>
          {activeTab === 'customer' ? (
            /* Customer Experience Simulation */
            <div className={styles.phoneFrame}>
              <div className={styles.phoneSpeaker} />
              <div className={styles.phoneScreen}>
                {/* Brand header */}
                <div className={styles.appHeader}>
                  <div className={styles.appBrand}>
                    <span className={styles.appBrandLogo}>✂️</span>
                    <div>
                      <h4 className={styles.appBrandName}>{t.demo.clientTitle}</h4>
                      <span className={styles.appStatus}>🟢 {lang === 'ar' ? 'متاح للحجز الفوري 24/7' : lang === 'he' ? 'זמין לקביעת תורים 24/7' : 'Available 24/7'}</span>
                    </div>
                  </div>
                  <span className={styles.appRating}>⭐ 4.95</span>
                </div>

                {!booked ? (
                  <div className={styles.bookingFlow}>
                    {/* Step 1: Select Service */}
                    <div className={styles.stepBlock}>
                      <label className={styles.stepLabel}>{t.demo.clientSelectService}</label>
                      <div className={styles.servicesGrid}>
                        {servicesList.map(s => (
                          <div
                            key={s.id}
                            className={`${styles.serviceOption} ${selectedService === s.id ? styles.serviceActive : ''}`}
                            onClick={() => setSelectedService(s.id)}
                          >
                            <span className={styles.serviceIcon}>{s.icon}</span>
                            <div className={styles.serviceDetails}>
                              <div className={styles.serviceName}>{s.name}</div>
                              <div className={styles.serviceMeta}>{s.duration}</div>
                            </div>
                            <span className={styles.servicePrice}>{s.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Select Staff */}
                    <div className={styles.stepBlock}>
                      <label className={styles.stepLabel}>{t.demo.clientSelectStaff}</label>
                      <div className={styles.staffGrid}>
                        {staffList.map(st => (
                          <div
                            key={st.id}
                            className={`${styles.staffOption} ${selectedStaff === st.id ? styles.staffActive : ''}`}
                            onClick={() => setSelectedStaff(st.id)}
                          >
                            <span className={styles.staffAvatar}>{st.avatar}</span>
                            <span className={styles.staffName}>{st.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Select Time */}
                    <div className={styles.stepBlock}>
                      <label className={styles.stepLabel}>{t.demo.clientSelectTime}</label>
                      <div className={styles.timesGrid}>
                        {times.map(tm => (
                          <button
                            key={tm}
                            type="button"
                            className={`${styles.timeChip} ${selectedTime === tm ? styles.timeChipActive : ''}`}
                            onClick={() => setSelectedTime(tm)}
                          >
                            {tm}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      className={`btn btn-primary ${styles.confirmBookingBtn}`}
                      onClick={handleBooking}
                    >
                      <span>⚡</span>
                      <span>{t.demo.clientConfirmBtn} ({servicesList[selectedService].price})</span>
                    </button>
                  </div>
                ) : (
                  /* Success Feedback */
                  <div className={styles.successScreen}>
                    <div className={styles.successIcon}>🎉</div>
                    <h3 className={styles.successTitle}>{t.demo.clientBookSuccess}</h3>
                    <div className={styles.successCard}>
                      <div className={styles.successRow}>
                        <span>{lang === 'ar' ? 'الخدمة:' : lang === 'he' ? 'שירות:' : 'Service:'}</span>
                        <strong>{servicesList[selectedService].name}</strong>
                      </div>
                      <div className={styles.successRow}>
                        <span>{lang === 'ar' ? 'مقدم الخدمة:' : lang === 'he' ? 'איש צוות:' : 'Specialist:'}</span>
                        <strong>{staffList[selectedStaff].name}</strong>
                      </div>
                      <div className={styles.successRow}>
                        <span>{lang === 'ar' ? 'الوقت:' : lang === 'he' ? 'שעה:' : 'Time:'}</span>
                        <strong>اليوم الساعة {selectedTime}</strong>
                      </div>
                      <div className={styles.successRow}>
                        <span>{lang === 'ar' ? 'الحالة:' : lang === 'he' ? 'סטטוס:' : 'Status:'}</span>
                        <span className={styles.confirmedBadge}>✓ {t.demo.salonConfirmed}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-outline ${styles.resetDemoBtn}`}
                      onClick={() => setBooked(false)}
                    >
                      🔄 {lang === 'ar' ? 'تجربة حجز موعد آخر' : lang === 'he' ? 'קבע תור נוסף לדוגמה' : 'Book Another Demo Appointment'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Salon Admin Dashboard Simulation */
            <div className={styles.dashboardFrame}>
              <div className={styles.dashHeader}>
                <div className={styles.dashTitleGroup}>
                  <h3 className={styles.dashTitle}>{t.demo.salonTitle}</h3>
                  <span className={styles.dashLiveBadge}>● {lang === 'ar' ? 'مباشر الآن' : lang === 'he' ? 'פעיל כעת' : 'Live'}</span>
                </div>
                <div className={styles.dashDate}>
                  {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'he' ? 'he-IL' : 'en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
              </div>

              {/* KPI Cards */}
              <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>📅</span>
                  <div className={styles.kpiVal}>18</div>
                  <div className={styles.kpiLbl}>{t.demo.salonTodayAppointments}</div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>💰</span>
                  <div className={styles.kpiVal}>₪2,450</div>
                  <div className={styles.kpiLbl}>{t.demo.salonRevenue}</div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>⏳</span>
                  <div className={styles.kpiVal}>4 {lang === 'ar' ? 'زبائن' : lang === 'he' ? 'ממתינים' : 'Clients'}</div>
                  <div className={styles.kpiLbl}>{t.demo.salonWaitlist}</div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>⭐</span>
                  <div className={styles.kpiVal}>99.2%</div>
                  <div className={styles.kpiLbl}>{lang === 'ar' ? 'حضور المواعيد' : lang === 'he' ? 'נוכחות תורים' : 'Show-up Rate'}</div>
                </div>
              </div>

              {/* Live appointments schedule */}
              <div className={styles.scheduleBox}>
                <h4 className={styles.scheduleTitle}>{t.demo.salonLiveFeed}</h4>
                <div className={styles.appointmentList}>
                  <div className={styles.dashAppItem}>
                    <span className={styles.dashAppTime}>10:00</span>
                    <div className={styles.dashAppClient}>
                      <strong>سارة النجار</strong>
                      <span>تنظيف بشرة ملكي (نور علي)</span>
                    </div>
                    <span className={styles.badgeSuccess}>✓ {t.demo.salonConfirmed}</span>
                    <span className={styles.dashAppPrice}>₪180</span>
                  </div>

                  <div className={styles.dashAppItem}>
                    <span className={styles.dashAppTime}>11:30</span>
                    <div className={styles.dashAppClient}>
                      <strong>أدهم منصور</strong>
                      <span>قص شعر ولحية VIP (أحمد كمال)</span>
                    </div>
                    <span className={styles.badgeSuccess}>✓ {t.demo.salonConfirmed}</span>
                    <span className={styles.dashAppPrice}>₪90</span>
                  </div>

                  <div className={styles.dashAppItem}>
                    <span className={styles.dashAppTime}>12:45</span>
                    <div className={styles.dashAppClient}>
                      <strong>دينا خليل</strong>
                      <span>جل أظافر وباديكير (ريما سالم)</span>
                    </div>
                    <span className={styles.badgeWarning}>⏳ {t.demo.salonPending}</span>
                    <span className={styles.dashAppPrice}>₪140</span>
                  </div>

                  <div className={styles.dashAppItem}>
                    <span className={styles.dashAppTime}>14:00</span>
                    <div className={styles.dashAppClient}>
                      <strong>رامي سعادة</strong>
                      <span>تصميم لحية ملكي (أحمد كمال)</span>
                    </div>
                    <span className={styles.badgeSuccess}>✓ {t.demo.salonConfirmed}</span>
                    <span className={styles.dashAppPrice}>₪70</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
