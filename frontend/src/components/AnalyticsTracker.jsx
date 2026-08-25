import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-08962YK98C";

/**
 * AnalyticsTracker tracks SPA route navigation in Google Analytics 4.
 * Base gtag tag is loaded in index.html, and this component notifies GA4
 * on client-side route changes.
 */
function AnalyticsTracker() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const pagePath = location.pathname + location.search;
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
        page_location: window.location.href,
      });
    }
  }, [location]);

  return null;
}

export default AnalyticsTracker;
