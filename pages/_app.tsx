import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReadingProgress } from "@/components/ReadingProgress";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track and save the last visited page URL and scroll position
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      localStorage.setItem('lastVisitedPage', url);
    };

    const handleScrollPersistence = () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`scroll-pos-${router.asPath}`, window.scrollY.toString());
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    window.addEventListener('scroll', handleScrollPersistence);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      window.removeEventListener('scroll', handleScrollPersistence);
    };
  }, [router, router.asPath]);

  // Restore the user's state only on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const lastPage = localStorage.getItem('lastVisitedPage');
    const hasRedirected = sessionStorage.getItem('hasRedirected');
    
    if (router.pathname === '/' && lastPage && lastPage !== '/' && !hasRedirected) {
      sessionStorage.setItem('hasRedirected', 'true');
      router.push(lastPage);
    } else {
      // Restore scroll position for the current page
      const savedScrollPos = localStorage.getItem(`scroll-pos-${router.asPath}`);
      if (savedScrollPos) {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
      }
      if (router.pathname === '/') {
        sessionStorage.setItem('hasRedirected', 'true');
      }
    }
  }, [router, router.pathname, router.asPath]);

  return (
    <>
      <Component {...pageProps} />
      <ReadingProgress />
    </>
  );
}
