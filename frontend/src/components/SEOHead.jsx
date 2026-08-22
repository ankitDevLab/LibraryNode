import { useEffect } from "react";

function SEOHead({ title, description, canonicalPath = "", ogType = "website" }) {
  const domain = "https://librarynode.online";
  const fullUrl = `${domain}${canonicalPath}`;
  const fullTitle = title.includes("Library Node") ? title : `${title} | Library Node`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to set or create meta element
    const setMetaTag = (selector, attrName, attrVal, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to set canonical URL link
    const setCanonicalLink = (href) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);

    // Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Library Node');

    // Canonical Link
    setCanonicalLink(fullUrl);
  }, [fullTitle, description, fullUrl, ogType]);

  return null;
}

export default SEOHead;
