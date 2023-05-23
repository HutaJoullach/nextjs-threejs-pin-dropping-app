import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Next.js, Three.js Pin Dropping App</title>
        <meta name="description" content="t3-threejs-pin-dropping-app" />
        {/* <link rel="icon" href="/alphabet.svg" /> */}
      </Head>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
