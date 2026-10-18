/** The five accent hues. Each has <hue>, <hue>-ink, <hue>-soft and <hue>-glow tokens. */
export type Hue = 'red' | 'orange' | 'green' | 'blue' | 'purple';
export const HUES: Hue[] = ['red', 'orange', 'green', 'blue', 'purple'];

/** Join class names, skipping falsy parts. */
export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
