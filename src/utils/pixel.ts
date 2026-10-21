declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const PIXEL_ID = "1811790967188190";

/**
 * Initializes the Meta Pixel.
 * The pixel script is already loaded via index.html's <script> tag.
 * This function ensures fbq is available and re-initializes if needed.
 */
export const initPixel = (pixelId?: string) => {
  if (typeof window === "undefined") return;

  const resolvedId = pixelId?.trim() || PIXEL_ID;

  // If already loaded and initialized (via index.html script), we're good
  if (window.fbq) {
    console.log(
      `%c[Meta Pixel] Ready (ID: ${resolvedId})`,
      "color: #4caf50; font-weight: bold;"
    );
    return;
  }

  // Fallback: inject the pixel script if it wasn't loaded by index.html
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", resolvedId);
  window.fbq("track", "PageView");
  console.log(
    `%c[Meta Pixel] Initialized with ID: ${resolvedId}`,
    "color: #4caf50; font-weight: bold;"
  );
};

/**
 * Tracks a standard Meta Pixel event with proper e-commerce parameters.
 * Standard events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead
 */
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    try {
      if (data) {
        window.fbq("track", eventName, data);
      } else {
        window.fbq("track", eventName);
      }
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking event "${eventName}":`, err);
    }
  } else {
    console.warn(`[Meta Pixel] fbq not available. Event ignored: ${eventName}`);
  }
};

/**
 * Tracks a PageView event for single-page application route transitions.
 */
export const trackPageView = (path?: string) => {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    try {
      window.fbq("track", "PageView", path ? { page_path: path } : undefined);
    } catch (err) {
      console.warn("[Meta Pixel] Error tracking PageView:", err);
    }
  }
};

/**
 * Tracks a Purchase event with all required fields for Meta Ads conversion tracking.
 * This is the most critical event for Meta Ads optimization.
 */
export const trackPurchase = (params: {
  value: number;
  currency: string;
  contentIds?: string[];
  contentName?: string;
  contentType?: string;
  numItems?: number;
}) => {
  trackEvent("Purchase", {
    value: params.value,
    currency: params.currency,
    content_ids: params.contentIds || [],
    content_name: params.contentName || "",
    content_type: params.contentType || "product",
    num_items: params.numItems || 1,
  });
};

/**
 * Tracks an AddToCart event with all required fields.
 */
export const trackAddToCart = (params: {
  contentName: string;
  contentCategory: string;
  contentIds: string[];
  value: number;
  currency: string;
}) => {
  trackEvent("AddToCart", {
    content_name: params.contentName,
    content_category: params.contentCategory,
    content_ids: params.contentIds,
    content_type: "product",
    value: params.value,
    currency: params.currency,
  });
};

/**
 * Tracks an InitiateCheckout event with all required fields.
 */
export const trackInitiateCheckout = (params: {
  value: number;
  currency: string;
  contentIds: string[];
  numItems: number;
}) => {
  trackEvent("InitiateCheckout", {
    value: params.value,
    currency: params.currency,
    content_ids: params.contentIds,
    content_type: "product",
    num_items: params.numItems,
  });
};

/**
 * Tracks a ViewContent event with all required fields.
 */
export const trackViewContent = (params: {
  contentName: string;
  contentCategory: string;
  contentIds: string[];
  value: number;
  currency: string;
}) => {
  trackEvent("ViewContent", {
    content_name: params.contentName,
    content_category: params.contentCategory,
    content_ids: params.contentIds,
    content_type: "product",
    value: params.value,
    currency: params.currency,
  });
};

/**
 * Tracks a custom Meta Pixel event.
 */
export const trackCustomEvent = (eventName: string, data?: object) => {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    try {
      window.fbq("trackCustom", eventName, data);
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking custom event "${eventName}":`, err);
    }
  } else {
    console.warn(`[Meta Pixel] fbq not available. Custom event ignored: ${eventName}`);
  }
};
