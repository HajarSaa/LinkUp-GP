import { useEffect } from "react";

const usePreventBack = () => {
  useEffect(() => {
    const handlePop = () => {
      window.history.pushState(null, "", window.location.pathname);
    };
    window.addEventListener("popstate", handlePop);
    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, []);
};

export default usePreventBack;
