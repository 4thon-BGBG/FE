import { useEffect, useState } from 'react';

export function useSplash() {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const onceSplash = sessionStorage.getItem('splash') || false;
    setIsSplash(onceSplash);
  }, []);

  const handleSplash = () => {
    setTimeout(() => setIsSplash(true), 500);
    sessionStorage.setItem('splash', true);
  };
  return { isSplash, handleSplash };
}
