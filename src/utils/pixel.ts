declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

/**
 * Initializes the Meta Pixel.
 * In development mode, if the Pixel ID is a placeholder, it will mock the fbq functions
 * and log to the console to ensure seamless local testing without tracking real production data.
 */
export const initPixel = (pixelId?: string) => {
  if (typeof window === "undefined") return;

  let resolvedId = pixelId?.trim() || "";
  if (!resolvedId || resolvedId === "YOUR_PIXEL_ID") {
    resolvedId = "1540428294391853";
  }

  // If already loaded and initialized (e.g. via direct script in index.html), avoid re-initializing
  if (window.fbq && window.fbq.loaded) {
    console.log(
      `%c[Meta Pixel] Already initialized (loaded via index.html/direct script)`,
      "color: #4caf50; font-weight: bold;"
    );
    return;
  }

  if (!resolvedId || resolvedId === "YOUR_PIXEL_ID" || resolvedId.includes("MY_")) {
    console.warn(
      `%c[Meta Pixel] Pixel ID is set to a placeholder ("${resolvedId}"). Real tracking is disabled, but events will log to the console for testing.`,
      "color: #ff9900; font-weight: bold;"
    );

    // Mock tracking function for easy console verification
    window.fbq = function (action: string, eventName: string, data?: any) {
      console.log(
        `%c[Meta Pixel MOCK] [${action}] ${eventName}`,
        "color: #1877f2; font-weight: bold;",
        data || ""
      );
    };
    return;
  }

  // Standard Meta Pixel code injection
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
  console.log(`%c[Meta Pixel] Successfully initialized with ID: ${resolvedId}`, "color: #4caf50; font-weight: bold;");
};

/**
 * Tracks a standard Meta Pixel event.
 */
export const trackEvent = (eventName: string, data?: object) => {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    window.fbq("track", eventName, data);
    // Add additional logging for developers in development
    if (import.meta.env.DEV) {
      console.log(`%c[Meta Pixel Event] ${eventName}`, "color: #1877f2;", data || "");
    }
  } else {
    console.warn(`[Meta Pixel] fbq not initialized. Event ignored: ${eventName}`);
  }
};

/**
 * Tracks a custom Meta Pixel event.
 */
export const trackCustomEvent = (eventName: string, data?: object) => {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    window.fbq("trackCustom", eventName, data);
    if (import.meta.env.DEV) {
      console.log(`%c[Meta Pixel Custom Event] ${eventName}`, "color: #1877f2; font-style: italic;", data || "");
    }
  } else {
    console.warn(`[Meta Pixel] fbq not initialized. Custom event ignored: ${eventName}`);
  }
};
