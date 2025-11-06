// =========================
// Base Path Configure
// =========================
// Ambil BASE_PATH dari environment variable
// Default ke '' jika tidak ada
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASEPATH || '';

// Safely join base path and a given route ensuring no double slashes.
export function buildApiUrl(path: string): string {
    // Skip base path untuk NextAuth routes dan assets
    if (path.startsWith('/api/auth/') || path.startsWith('/assets/')) {
        return path;
    }

    const base = (BASE_PATH || '').replace(/\/$/, '');
    if (!path) return base;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
}

// Optional: alias name
export const withBasePath = buildApiUrl;
