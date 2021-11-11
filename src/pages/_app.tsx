import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
