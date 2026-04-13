export const theme = {
  colors: {
    primary: '#0B5D66',
    gold: '#16C7C0',
    white: '#FFFFFF',
    light: '#EFFCFB',
    body: '#15373B',
    muted: '#5D7C80',
    border: '#BFE7E5',
  },
  typography: {
    heading: '"Lora", serif',
    body: '"Open Sans", sans-serif',
  },
  spacing: {
    sectionY: '5rem',
    containerX: '1rem',
    radius: '0.5rem',
  },
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
} as const

export type Theme = typeof theme
