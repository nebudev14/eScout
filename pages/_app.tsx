import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Nav } from "../components/Nav";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="bg-slate-100">
        <Nav />
        <Component {...pageProps} />{" "}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
