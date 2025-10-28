//Author - Pratham Khare
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls smoothly to top every time the route changes
    window.scrollTo(0, 0 );
  }, [pathname]);

  return null;
};

export default ScrollToTop;
