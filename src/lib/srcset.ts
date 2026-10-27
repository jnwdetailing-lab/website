import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve('public');
const VARIANT_WIDTHS = [140, 400, 680, 760, 1080];

/** `sizes` for the photo in the PageHero component (service, city and about pages). */
export const PAGE_HERO_SIZES = '(max-width: 900px) min(420px, calc(100vw - 2.5rem)), 470px';

/** Pixel width read straight from a JPEG, PNG or WebP header, without decoding the image. */
function pixelWidth(file: string): number | undefined {
  let b: Buffer;
  try { b = fs.readFileSync(file); } catch { return undefined; }
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return b.readUInt32BE(16);
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return b.readUInt16LE(26) & 0x3fff;
    if (chunk === 'VP8L') return 1 + (((b[22] & 0x3f) << 8) | b[21]);
    if (chunk === 'VP8X') return 1 + b.readUIntLE(24, 3);
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return b.readUInt16BE(i + 7);
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return undefined;
}

/**
 * srcset for an image in /public that has smaller copies saved next to it as
 * `<name>-<width>w.webp` (e.g. hero.webp → hero-760w.webp, hero-1080w.webp).
 *
 * Only copies that exist on disk at build time are listed, so a missing variant
 * never produces a broken URL. The original is added as the largest candidate
 * unless a re-encoded copy of the same width exists. Returns undefined when
 * there are no copies, in which case the plain src is used as before.
 *
 * To add copies for a new image, resize it to any of VARIANT_WIDTHS and save it
 * as WebP with the -<width>w suffix; nothing else needs to change.
 */
export function srcsetFor(src: string | undefined, fullWidth?: number): string | undefined {
  if (!src || !src.startsWith('/')) return undefined;
  const full = fullWidth ?? pixelWidth(path.join(PUBLIC_DIR, src));
  if (!full) return undefined;
  const base = src.replace(/\.(webp|jpe?g|png)$/i, '');
  const exists = (w: number) => fs.existsSync(path.join(PUBLIC_DIR, `${base}-${w}w.webp`));
  const widths = VARIANT_WIDTHS.filter((w) => w <= full && exists(w));
  if (!widths.length) return undefined;
  const parts = widths.map((w) => `${base}-${w}w.webp ${w}w`);
  if (!widths.includes(full)) parts.push(`${src} ${full}w`);
  return parts.join(', ');
}
