/**
 * Jancy Builders - Google Integration & Analytics Layer
 * Safe, zero-exposure event tracking supporting Google Analytics 4 (GA4) / GTM.
 *
 * Configured via NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.
 * If not set, gracefully falls back without any console noise or breaking changes.
 */

type AnalyticsEvent =
  | "hero_cta_click"
  | "quote_modal_open"
  | "quote_submission"
  | "estimator_step_change"
  | "estimator_completion"
  | "boq_whatsapp_click"
  | "expert_call_click"
  | "general_whatsapp_click"
  | "project_case_study_view"
  | "timelapse_interaction";

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;

  try {
    // If window.gtag is available (Google Analytics)
    const win = window as any;
    if (typeof win.gtag === "function") {
      win.gtag("event", eventName, params);
    }

    // If Google Tag Manager dataLayer is available
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // Development logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Jancy Analytics] ${eventName}:`, params);
    }
  } catch (err) {
    // Fail silently in production
  }
}

/**
 * Helper to generate Google Maps Search / Direction URL
 */
export function getGoogleMapsUrl(latitude = 8.337495, longitude = 77.698087, query = "Jancy Builders Samugarengapuram"): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&query_place_id=${latitude},${longitude}`;
}
