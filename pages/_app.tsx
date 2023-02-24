import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Nav } from "../components/ui/nav";
import "../styles/globals.css";
import { withTRPC } from "@trpc/next";
import { appRouter } from "../server/routers/_app";
import { useAtom } from "jotai";
import { darkModeAtom } from "../server/atoms";
import NextNProgress from 'nextjs-progressbar';
import { trpc } from "../util/trpc/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, ] = useAtom(darkModeAtom);

  return (
    <SessionProvider session={pageProps.session}>
      <div className={`duration-150 ${darkMode ? 'dark' : null}`}>
        <div className="bg-slate-100 dark:bg-zinc-800">
          <NextNProgress color="#e11d48" />
          <Nav />
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
export default trpc.withTRPC(MyApp);