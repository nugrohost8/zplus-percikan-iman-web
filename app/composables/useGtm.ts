export function useGtm() {
  function trackEvent(event: string, payload: Record<string, any> = {}) {
    if (typeof window === 'undefined') return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event,
      ...payload
    });

    console.debug('[GTM]', event, payload); // optional log for dev
  }

  return { trackEvent };
}