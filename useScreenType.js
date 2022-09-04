import { useState, useEffect } from "react";

export const DEFAULT_BREAKPOINTS = {
  largeDesktop: 1440,
  desktop: 992,
  tablet: 768,
  mobile: 320,
};
export const BREAKPOINT_TYPES = {
  mobile: "MOBILE",
  tablet: "TABLET",
  desktop: "DESKTOP",
  largeDesktop: "LARGE_DESKTOP",
};
export const getCurrentScreenType = (currentScreenType) => ({
  isMobile: currentScreenType === BREAKPOINT_TYPES.mobile,
  isTablet: currentScreenType === BREAKPOINT_TYPES.tablet,
  isDesktop: currentScreenType === BREAKPOINT_TYPES.desktop,
  isLargeDesktop: currentScreenType === BREAKPOINT_TYPES.largeDesktop,
});

export const calculateCurrentScreenType = (breakpoints) => ({
  isMobile: window.innerWidth < breakpoints.tablet,
  isTablet:
    window.innerWidth >= breakpoints.tablet &&
    window.innerWidth < breakpoints.desktop,
  isDesktop:
    window.innerWidth >= breakpoints.desktop &&
    window.innerWidth < breakpoints.largeDesktop,
  isLargeDesktop: window.innerWidth >= breakpoints.largeDesktop,
});

function useScreenType(breakpoints = DEFAULT_BREAKPOINTS) {
  const [screenType, setScreenType] = useState(
    calculateCurrentScreenType(breakpoints)
  );
  const handleResize = (type) => (event) =>
    event.matches && setScreenType(getCurrentScreenType(type));

  useEffect(() => {
    setScreenType(calculateCurrentScreenType(breakpoints));

    const largeDesktopQueryList = matchMedia(
      `(min-width: ${breakpoints.largeDesktop}px)`
    );
    const desktopQueryList = matchMedia(
      `(min-width: ${breakpoints.desktop}px) and (max-width: ${
        breakpoints.largeDesktop - 1
      }px)`
    );
    const tabletQueryList = matchMedia(
      `(min-width: ${breakpoints.tablet}px) and (max-width: ${
        breakpoints.desktop - 1
      }px)`
    );
    const mobileQueryList = matchMedia(`(max-width: ${breakpoints.tablet}px)`);

    mobileQueryList.addEventListener(handleResize(BREAKPOINT_TYPES.mobile));
    tabletQueryList.addEventListener(handleResize(BREAKPOINT_TYPES.tablet));
    desktopQueryList.addEventListener(handleResize(BREAKPOINT_TYPES.desktop));
    largeDesktopQueryList.addEventListener(
      handleResize(BREAKPOINT_TYPES.largeDesktop)
    );

    return () => {
      mobileQueryList.removeEventListener(handleResize(BREAKPOINT_TYPES.mobile));
      tabletQueryList.removeEventListener(handleResize(BREAKPOINT_TYPES.tablet));
      desktopQueryList.removeEventListener(handleResize(BREAKPOINT_TYPES.desktop));
      largeDesktopQueryList.removeEventListener(
        handleResize(BREAKPOINT_TYPES.largeDesktop)
      );
    };
  }, []);
  return screenType;
}

export default useScreenType;