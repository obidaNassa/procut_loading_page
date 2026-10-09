import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './AccessibilityWidget.module.css'

const STORAGE_KEY = 'procut_a11y'

const defaultSettings = {
  textSize: 0, // 0: default, 1: +1, 2: +2, 3: +3
  contrast: 'normal', // 'normal' | 'high' | 'invert'
  colorFilter: 'normal', // 'normal' | 'sepia' | 'grayscale'
  underlineLinks: false,
  highlightHeadings: false,
  bigCursor: false,
  pauseAnimations: false,
  readableFont: false,
}

export default function AccessibilityWidget() {
  const { t, lang, dir } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  // Apply settings to document.documentElement
  useEffect(() => {
    const root = document.documentElement

    // Text size
    if (settings.textSize > 0) {
      root.setAttribute('data-a11y-text', String(settings.textSize))
    } else {
      root.removeAttribute('data-a11y-text')
    }

    // Contrast
    if (settings.contrast !== 'normal') {
      root.setAttribute('data-a11y-contrast', settings.contrast)
    } else {
      root.removeAttribute('data-a11y-contrast')
    }

    // Color filter
    if (settings.colorFilter !== 'normal') {
      root.setAttribute('data-a11y-filter', settings.colorFilter)
    } else {
      root.removeAttribute('data-a11y-filter')
    }

    // Toggles
    if (settings.underlineLinks) root.setAttribute('data-a11y-underline', 'true')
    else root.removeAttribute('data-a11y-underline')

    if (settings.highlightHeadings) root.setAttribute('data-a11y-headings', 'true')
    else root.removeAttribute('data-a11y-headings')

    if (settings.bigCursor) root.setAttribute('data-a11y-cursor', 'true')
    else root.removeAttribute('data-a11y-cursor')

    if (settings.pauseAnimations) root.setAttribute('data-a11y-pause-anim', 'true')
    else root.removeAttribute('data-a11y-pause-anim')

    if (settings.readableFont) root.setAttribute('data-a11y-font', 'true')
    else root.removeAttribute('data-a11y-font')

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetAll = () => {
    setSettings(defaultSettings)
  }

  const getTextSizeLabel = () => {
    if (settings.textSize === 0) return t.a11y.default
    if (settings.textSize === 1) return t.a11y.large
    return t.a11y.extraLarge
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setIsOpen(true)}
        aria-label={t.a11y.title}
        title={t.a11y.title}
        id="a11y-trigger-btn"
      >
        <div className={styles.triggerInner}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="17.5" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
            <path d="M14.5 7.5L11 9.5l2.5 4.5h4.5v4" />
            <path d="M7 11.5a5 5 0 1 0 6.5 4.5" />
            <path d="M11 9.5L7.5 7" />
          </svg>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        dir={dir}
        aria-label={t.a11y.title}
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="17.5" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
                <path d="M14.5 7.5L11 9.5l2.5 4.5h4.5v4" />
                <path d="M7 11.5a5 5 0 1 0 6.5 4.5" />
                <path d="M11 9.5L7.5 7" />
              </svg>
            </span>
            <h2 className={styles.headerTitle}>{t.a11y.title}</h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label={t.a11y.close}
            title={t.a11y.close}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.body}>
          {/* 1. Text Size */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </span>
              <span className={styles.groupTitle}>{t.a11y.textSize}</span>
            </div>

            <div className={styles.stepperRow}>
              <button
                type="button"
                className={styles.stepperBtn}
                onClick={() => updateSetting('textSize', Math.max(0, settings.textSize - 1))}
                disabled={settings.textSize === 0}
                aria-label="Decrease text size"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              <span className={styles.stepperLabel}>{getTextSizeLabel()}</span>

              <button
                type="button"
                className={styles.stepperBtn}
                onClick={() => updateSetting('textSize', Math.min(2, settings.textSize + 1))}
                disabled={settings.textSize === 2}
                aria-label="Increase text size"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>
          </div>

          {/* 2. Contrast */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.groupTitle}>{t.a11y.contrast}</span>
            </div>

            <div className={styles.segmentedRow}>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.contrast === 'normal' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('contrast', 'normal')}
              >
                {t.a11y.contrastNormal}
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.contrast === 'high' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('contrast', 'high')}
              >
                {t.a11y.contrastHigh}
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.contrast === 'invert' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('contrast', 'invert')}
              >
                {t.a11y.contrastInvert}
              </button>
            </div>
          </div>

          {/* 3. Color filter */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
              <span className={styles.groupTitle}>{t.a11y.colorFilter}</span>
            </div>

            <div className={styles.segmentedRow}>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.colorFilter === 'normal' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('colorFilter', 'normal')}
              >
                {t.a11y.filterNormal}
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.colorFilter === 'sepia' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('colorFilter', 'sepia')}
              >
                {t.a11y.filterSepia}
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${settings.colorFilter === 'grayscale' ? styles.segmentedBtnActive : ''}`}
                onClick={() => updateSetting('colorFilter', 'grayscale')}
              >
                {t.a11y.filterGrayscale}
              </button>
            </div>
          </div>

          {/* 4. More Settings */}
          <div className={styles.controlGroup}>
            <div className={styles.sectionDividerHeader}>
              <span className={styles.sectionDividerTitle}>{t.a11y.moreSettings}</span>
            </div>

            <div className={styles.togglesList}>
              {/* Underline links */}
              <label className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3v7a6 6 0 0 0 12 0V3" />
                      <line x1="4" y1="21" x2="20" y2="21" />
                    </svg>
                  </span>
                  <span className={styles.toggleLabel}>{t.a11y.underlineLinks}</span>
                </div>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={settings.underlineLinks}
                  onChange={(e) => updateSetting('underlineLinks', e.target.checked)}
                />
                <span className={styles.switchSlider} />
              </label>

              {/* Highlight headings */}
              <label className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleIcon}>
                    <strong style={{ fontSize: '0.85rem', fontWeight: 800 }}>H₂</strong>
                  </span>
                  <span className={styles.toggleLabel}>{t.a11y.highlightHeadings}</span>
                </div>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={settings.highlightHeadings}
                  onChange={(e) => updateSetting('highlightHeadings', e.target.checked)}
                />
                <span className={styles.switchSlider} />
              </label>

              {/* Big cursor */}
              <label className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 3 10 21 13 13 21 10 3 3" />
                    </svg>
                  </span>
                  <span className={styles.toggleLabel}>{t.a11y.bigCursor}</span>
                </div>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={settings.bigCursor}
                  onChange={(e) => updateSetting('bigCursor', e.target.checked)}
                />
                <span className={styles.switchSlider} />
              </label>

              {/* Pause animations */}
              <label className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="10" y1="15" x2="10" y2="9" />
                      <line x1="14" y1="15" x2="14" y2="9" />
                    </svg>
                  </span>
                  <span className={styles.toggleLabel}>{t.a11y.pauseAnimations}</span>
                </div>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={settings.pauseAnimations}
                  onChange={(e) => updateSetting('pauseAnimations', e.target.checked)}
                />
                <span className={styles.switchSlider} />
              </label>

              {/* Clear readable font */}
              <label className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 7 4 4 20 4 20 7" />
                      <line x1="12" y1="4" x2="12" y2="20" />
                    </svg>
                  </span>
                  <span className={styles.toggleLabel}>{t.a11y.readableFont}</span>
                </div>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={settings.readableFont}
                  onChange={(e) => updateSetting('readableFont', e.target.checked)}
                />
                <span className={styles.switchSlider} />
              </label>
            </div>
          </div>

          {/* Reset button */}
          <button
            type="button"
            className={styles.resetBtn}
            onClick={resetAll}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>{t.a11y.reset}</span>
          </button>
        </div>

        {/* Footer info link */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t.a11y.statementPre}
            <a
              href="https://procut.me/accessibility"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statementLink}
            >
              {t.a11y.statementLink}
            </a>
          </p>
        </div>
      </aside>
    </>
  )
}
