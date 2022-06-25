import { SessionProvider } from "next-auth/react";
import Nav from "../components/Nav";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="bg-slate-100">
        <Nav />
        <Component {...pageProps} />{" "}
      </div>
    </SessionProvider>
  );
}

export default App;
