import { useEffect, useState } from 'react';

export default function useTransitionEvent(
  display: boolean | undefined | null | never[],
  time: number,
) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (display && !render) {
      setTimeout(() => setRender(true), time + 100);
    }
    if (!display && render) {
      setTimeout(() => setRender(false), time);
    }
    return () => {
      clearTimeout(setTimeout(() => 0));
    };
  }, [display, time, render]);

  const applyOpacity = render ? { opacity: 1 } : { opacity: 0.5 };

  return { render, applyOpacity };
}
