import { useEffect, useState } from 'react';

import throttle from '../utils/throttle';

type Props = {
  breakpoint?: number;
};

const useCheckMobileScreen = ({ breakpoint }: Props) => {
  const BREAKPOINT = breakpoint || 1024;

  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // execute only on the client side
    if (typeof window !== 'undefined') {
      let handleSizeChange = () => {
        setWidth(window.innerWidth);
      };

      handleSizeChange = throttle(handleSizeChange, 500);

      window.addEventListener('resize', handleSizeChange);
      handleSizeChange();

      return () => window.removeEventListener('resize', handleSizeChange);
    }
  }, []);

  return width <= BREAKPOINT;
};

export default useCheckMobileScreen;
