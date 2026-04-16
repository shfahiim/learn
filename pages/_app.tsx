import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReadingProgress } from "@/components/ReadingProgress";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track and save the last visited page URL whenever the route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      localStorage.setItem('lastVisitedPage', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Restore the user's state only on initial load if they arrive at the start page (/)
  useEffect(() => {
    if (router.pathname !== '/' || typeof window === 'undefined') return;
    
    const lastPage = localStorage.getItem('lastVisitedPage');
    const hasRedirected = sessionStorage.getItem('hasRedirected');
    
    if (lastPage && lastPage !== '/' && !hasRedirected) {
      sessionStorage.setItem('hasRedirected', 'true');
      router.push(lastPage);
    } else if (router.pathname === '/') {
      // Ensure if they actively click "Home" later, they aren't forcibly redirected away
      sessionStorage.setItem('hasRedirected', 'true');
    }
  }, [router, router.pathname]);

  return (
    <>
      <Component {...pageProps} />
      <ReadingProgress />
    </>
  );
}
