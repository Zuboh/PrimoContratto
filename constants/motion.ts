// Primo Design System — Motion tokens (Section 15)
// Source: docs/design/Primo Design System.html

export const duration = {
  instant: 80,    // hover, focus ring
  quick: 160,     // tap feedback, FAB press, ripple
  base: 240,      // default transitions — cards, fades, dropdowns
  soft: 360,      // bottom sheets, page transitions
  slow: 520,      // success animations, hero appearances
  breath: 2400,   // idle loops — panda, leaf, waves
} as const

// Cubic-bezier strings for react-native-reanimated Easing.bezier()
export const easing = {
  out: [0.22, 0.61, 0.36, 1] as [number, number, number, number],    // things arriving
  in: [0.55, 0.06, 0.68, 0.19] as [number, number, number, number],  // things leaving
  soft: [0.42, 0, 0.32, 1] as [number, number, number, number],      // smooth in-and-out
  breath: [0.45, 0, 0.55, 1] as [number, number, number, number],    // symmetric idle loops
} as const

export type DurationKey = keyof typeof duration
export type EasingKey = keyof typeof easing
