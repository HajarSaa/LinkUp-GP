import { useEffect, useState } from "react";

function useFormattedTime(locale = "en-EG") {
  const [time, setTime] = useState(new Date().toLocaleTimeString(locale));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale));
    }, 1000);

    return () => clearInterval(interval);
  }, [locale]);

  return time;
}

export default useFormattedTime;