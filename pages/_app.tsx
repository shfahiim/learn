import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReadingProgress } from "../components/ReadingProgress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ReadingProgress />
    </>
  );
}
