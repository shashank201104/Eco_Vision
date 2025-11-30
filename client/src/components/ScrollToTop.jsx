//Author - Pratham Khare

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Destructure current route path from React Router
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls smoothly to top every time the route changes
    window.scrollTo(0, 0 );
  }, [pathname]); // Dependency ensures effect runs only when route changes
 
  // This component does not render anything visually
  return null;
};

export default ScrollToTop;
