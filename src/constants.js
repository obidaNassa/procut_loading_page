export const OFFICIAL_PHONE = '+972525336954'
export const DISPLAY_PHONE = '+972 52-533-6954'

export const getWhatsAppUrl = (message) => {
  return `https://wa.me/${OFFICIAL_PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
}
