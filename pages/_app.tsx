import { AppProps } from "next/app";
import "../src/styles/global.css";
import ContextProvider from "../components/context/ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <main className="flex min-h-screen flex-col justify-between">
        <Component {...pageProps} />
      </main>
    </ContextProvider>
  );
}
