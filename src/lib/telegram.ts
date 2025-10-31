export function useTelegramTheme() {
  const tg = (window as any).Telegram?.WebApp
  const theme = tg?.themeParams || {}
  const bg = theme.bg_color || '#0b0d10'
  document.body.style.background = bg
  return theme
}