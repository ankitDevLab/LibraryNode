import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-08962YK98C";

/**
 * AnalyticsTracker tracks SPA route navigation in Google Analytics 4.
 * Base gtag tag is loaded in index.html, and this component notifies GA4
 * on client-side route changes. It also fetches the user's actual city
 * and passes it as a custom dimension to GA4 to correct IP geolocation discrepancies.
 */
function AnalyticsTracker() {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [userCity, setUserCity] = useState(null);

  // Fetch the user's actual city name using a free geolocation API on mount
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.city) {
          setUserCity(data.city);
          if (typeof window !== "undefined" && typeof window.gtag === "function") {
            // Set User-scoped custom property
            window.gtag("set", "user_properties", {
              manual_city: data.city,
              user_city: data.city,
            });
            console.log(`[GA4] Set manual_city to ${data.city}`);
          }
        }
      })
      .catch((err) => console.warn("[GA4] Failed to get geolocation:", err));
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const pagePath = location.pathname + location.search;
      
      const configParams = {
        page_path: pagePath,
        page_location: window.location.href,
      };

      // If we have resolved the user's city, pass it with the hit
      if (userCity) {
        configParams.manual_city = userCity;
        configParams.user_city = userCity;
      }

      window.gtag("config", GA_MEASUREMENT_ID, configParams);
    }
  }, [location, userCity]);

  return null;
}

export default AnalyticsTracker;
