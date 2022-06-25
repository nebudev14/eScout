import { SessionProvider } from "next-auth/react";
import Nav from "../components/Nav";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="text-white bg-black">
        <Nav />
        <Component {...pageProps} />{" "}
      </div>
    </SessionProvider>
  );
}

export default App;
