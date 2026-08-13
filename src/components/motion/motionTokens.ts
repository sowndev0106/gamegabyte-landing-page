/**
 * Shared scroll-reveal motion: content rises a little and fades in as it enters
 * the viewport. Kept in one place so every section moves the same way.
 */
export const RISE = 32
export const RISE_DURATION = 0.55
export const RISE_EASE = [0.22, 1, 0.36, 1] as const
export const STAGGER_STEP = 0.09
/** Fraction of an element that must be visible before it animates. */
export const REVEAL_AMOUNT = 0.15
