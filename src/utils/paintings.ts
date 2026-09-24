import { asset } from './asset';

/** Background paintings: spring blossoms (light) and Van Gogh's Starry Night (dark, public domain). */
export const FLOWER_URL = asset('images/flowers.webp');
export const STARRY_NIGHT_URL = asset('images/starry-night.webp');

export function paintingUrl(isDark: boolean): string {
  return isDark ? STARRY_NIGHT_URL : FLOWER_URL;
}
