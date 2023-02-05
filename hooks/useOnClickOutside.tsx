import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  const handleClick = (e: Event): void => {
    const el = ref?.current;
    if ((el && !el.contains(e.target as Node)) || null) {
      handler(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
