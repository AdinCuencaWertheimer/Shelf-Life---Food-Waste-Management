import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SwipeNavigationProps {
  children: React.ReactNode;
}

const navPaths = ["/recipes", "/", "/add"];

export const SwipeNavigation = ({ children }: SwipeNavigationProps) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentIndex = () => {
    return navPaths.findIndex(path => path === location.pathname);
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const deltaX = touchEndX.current - touchStartX.current;
    
    if (Math.abs(deltaX) < swipeThreshold) return;
    
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;

    let newIndex;
    
    if (deltaX > 0) {
      // Swipe right - go to previous tab
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      // Swipe left - go to next tab
      newIndex = Math.min(navPaths.length - 1, currentIndex + 1);
    }
    
    if (newIndex !== currentIndex) {
      navigate(navPaths[newIndex]);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  useEffect(() => {
    const container = document.getElementById('swipe-container');
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [location.pathname]);

  return (
    <div id="swipe-container" className="h-full w-full">
      {children}
    </div>
  );
};