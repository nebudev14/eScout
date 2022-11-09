import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Nav } from "../components/ui/nav";
import "../styles/globals.css";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/routers/app";
import { useAtom } from "jotai";
import { darkModeAtom } from "../server/atoms";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, ] = useAtom(darkModeAtom);

  return (
    <SessionProvider session={pageProps.session}>
      <div className={`duration-150 ${darkMode ? 'dark' : null}`}>
        <div className="bg-slate-100 dark:bg-zinc-800">
          <Nav />
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    // const url = process.env.VERCEL_URL
    //   ? `https://${process.env.VERCEL_URL}/api/trpc`
    //   : "http://localhost:3000/api/trpc";
    const url = "https://escout-xi.vercel.app/api/trpc"

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
