import { useEffect, useState } from "react";

export const useLoadingDelay = (
  loading: boolean,
  delayTimeMs: number = 2000
) => {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => setDelay(false), delayTimeMs || 2000);
  }, [loading]);

  return { delay, setDelay };
};
