import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoreAfterBack(routePath: string, storageKey = "scroll-pos") {
  const location = useLocation();

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.entryType;

    const shouldRestore = location.pathname === routePath && navType === "back_forward";

    if (shouldRestore) {
      const savedY = sessionStorage.getItem(storageKey);
      if (savedY) {
        // Espera DOM e imagens carregarem (evita pular antes dos elementos aparecerem)
        const waitForDom = () => {
          if (document.readyState === "complete") {
            requestAnimationFrame(() => {
              window.scrollTo(0, parseInt(savedY, 10));
              sessionStorage.removeItem(storageKey);
            });
          } else {
            window.addEventListener("load", () => {
              requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedY, 10));
                sessionStorage.removeItem(storageKey);
              });
            });
          }
        };

        waitForDom();
      }
    }
  }, [location.pathname]);
}