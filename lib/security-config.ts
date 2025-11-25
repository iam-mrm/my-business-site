/**
 * Security Configuration for Mr.M Portfolio
 * Defines CSP, security headers, and content policies
 */

export const securityConfig = {
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.jsdelivr.net'],
    'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    'img-src': ["'self'", 'data:', 'https:', 'placehold.co'],
    'font-src': ["'self'", 'fonts.gstatic.com', 'data:'],
    'connect-src': ["'self'", 'https:'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
  },

  // Security Headers
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  },

  // Rate Limiting (for API routes if added)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
  },

  // CORS Configuration
  cors: {
    origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS'],
  },

  // Session Configuration
  session: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
};

/**
 * Generate CSP header string from config
 */
export function generateCSPHeader(): string {
  return Object.entries(securityConfig.csp)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * Validate environment and security setup
 */
export function validateSecuritySetup(): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Check for production environment
  if (process.env.NODE_ENV !== 'production') {
    warnings.push('Not running in production mode');
  }

  // Check for site URL configuration
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    warnings.push('NEXT_PUBLIC_SITE_URL environment variable not set');
  }

  // Check for source maps in production
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_SOURCE_MAPS === 'true') {
    warnings.push('Source maps are enabled in production - disable for security');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}
