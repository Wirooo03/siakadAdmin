// =========================
// Base Path Configure for Assets
// =========================
// Ambil ASSETS_BASE_PATH dari environment variable
// Prioritaskan NEXT_PUBLIC_ASSETS_BASEPATH, fallback ke NEXT_PUBLIC_BASEPATH, lalu ''
export const ASSETS_BASE_PATH: string = process.env.NEXT_PUBLIC_BASEPATH || '';

// Safely join assets base path and a given asset route ensuring no double slashes.
export function buildAssetUrl(path: string): string {
  // Jika path kosong, kembalikan base (tanpa trailing slash)
  const base = (ASSETS_BASE_PATH || '').replace(/\/$/, '');
  if (!path) return base;

  // Jika sudah merupakan URL absolut (http(s):// atau //), kembalikan apa adanya
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;

  // Normalisasi path agar selalu diawali '/'
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

// Alias optional
export const withAssetsBasePath = buildAssetUrl;

// Example usage:
// import { withAssetsBasePath } from '@/lib/util/basePathAsset';
// <Image src={withAssetsBasePath('/assets/latar.webp')} ... />
