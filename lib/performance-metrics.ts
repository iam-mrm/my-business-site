/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and performance metrics
 */

/**
 * Get performance metrics thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals thresholds (milliseconds)
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  TTFB: { good: 600, needsImprovement: 1800 }, // Time to First Byte
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
};

/**
 * Rate performance metric
 */
export function rateMetric(
  value: number,
  good: number,
  needsImprovement: number
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= good) return 'good';
  if (value <= needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Log Web Vital
 */
export function logWebVital(metric: any): void {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    // In production, send to analytics service
    const { name, value } = metric;
    console.log(`[Web Vital] ${name}: ${value.toFixed(0)}ms`);

    // Example: Send to analytics
    // fetch('/api/analytics/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // });
  }
}

/**
 * Get Navigation Timing metrics
 */
export function getNavigationTimings(): Record<string, number> {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  const perfData = window.performance.timing;
  const perfNav = window.performance.navigation;

  return {
    // DNS lookup
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    // TCP connection
    tcp: perfData.connectEnd - perfData.connectStart,
    // Request time
    request: perfData.responseStart - perfData.requestStart,
    // Response time
    response: perfData.responseEnd - perfData.responseStart,
    // DOM processing
    domInteractive: perfData.domInteractive - perfData.domLoading,
    // DOM Complete
    domComplete: perfData.domComplete - perfData.domInteractive,
    // Page load complete
    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
    // Total time
    totalTime: perfData.loadEventEnd - perfData.navigationStart,
    // Navigation type (0=reload, 1=forward-back, 2=reload-with-cache, 255=else)
    navigationType: perfNav.type,
  };
}

/**
 * Get Resource Timing metrics
 */
export function getResourceTimings(): PerformanceResourceTiming[] {
  if (typeof window === 'undefined' || !window.performance) {
    return [];
  }

  return window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
}

/**
 * Get Long Tasks (if PerformanceObserver available)
 */
export function observeLongTasks(callback: (duration: number) => void): PerformanceObserver | null {
  if (typeof window === 'undefined' || !window.PerformanceObserver) {
    return null;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ('duration' in entry) {
          callback(entry.duration);
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  } catch (e) {
    console.log('Long Tasks API not supported');
    return null;
  }
}

/**
 * Measure cumulative layout shift
 */
export function measureCLS(): Promise<number> {
  return new Promise((resolve) => {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      resolve(0);
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!('hadRecentInput' in entry) || !(entry as any).hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value || 0;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      // Stop after 5 seconds of inactivity
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 5000);
    } catch (e) {
      resolve(0);
    }
  });
}

/**
 * Get memory usage (Chrome only)
 */
export function getMemoryUsage(): { usedJSHeapSize: number; jsHeapSizeLimit: number } | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const perf = (window.performance as any);
  if (perf && perf.memory) {
    return {
      usedJSHeapSize: perf.memory.usedJSHeapSize,
      jsHeapSizeLimit: perf.memory.jsHeapSizeLimit,
    };
  }

  return null;
}

/**
 * Report performance metrics
 */
export async function reportMetrics(): Promise<void> {
  if (typeof window === 'undefined' || process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    return;
  }

  try {
    const navTimings = getNavigationTimings();
    const cls = await measureCLS();

    const metrics = {
      url: window.location.href,
      userAgent: navigator.userAgent,
      navigationTimings: navTimings,
      cls,
      timestamp: new Date().toISOString(),
    };

    // Send to analytics endpoint
    console.log('Performance Metrics:', metrics);
    // await fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metrics),
    // });
  } catch (error) {
    console.error('Failed to report metrics:', error);
  }
}
