/**
 * Ocean Professional theme tokens.
 * Use these constants for consistent styling across components.
 */
export const Theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    shadow: '#00000033',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    title: 64,
    h1: 48,
    h2: 36,
    h3: 28,
    body: 22,
    caption: 18,
  },
}

/**
// PUBLIC_INTERFACE
 */
export function applyTheme(app) {
  /** This is a public function.
   * Applies a subtle background gradient and sets defaults.
   */
  app.$patch({
    colorTop: Theme.colors.background,
    colorBottom: Theme.colors.surface,
  })
}

/**
 * Utility to draw a shadow-like overlay for depth.
 */
export function shadow(e, intensity = 0.25) {
  return [
    e.$shader('radius', { radius: Theme.radius.md }),
    e.$shader('shadow', { color: Theme.colors.shadow, blur: 16, alpha: intensity }),
  ]
}
