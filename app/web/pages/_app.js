import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-black">
      <Component {...pageProps} />{" "}
    </div>
  );
}

export default MyApp;
