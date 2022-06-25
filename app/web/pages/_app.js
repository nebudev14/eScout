import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="bg-black">
        <Component {...pageProps} />{" "}
      </div>
    </SessionProvider>
  );
}

export default App;
