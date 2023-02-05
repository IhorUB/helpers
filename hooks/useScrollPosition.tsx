import { useEffect, useState } from 'react';

type Props = {
  breakpoint?: number;
};
const useScrollPosition = (breakpoint = 200) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', listenToScroll);
      return () => window.removeEventListener('scroll', listenToScroll);
    }
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    winScroll > breakpoint ? setScroll(true) : setScroll(false);
  };
  return scroll;
};

export default useScrollPosition;
