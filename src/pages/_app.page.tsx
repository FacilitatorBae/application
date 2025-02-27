import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Poppins, Comfortaa, Inter, Montserrat } from "next/font/google";
import "~/styles/globals.css";
import { Footer, Header, Favorites } from "~/components";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import Head from "next/head";
import AppContext from "../context/AppContext";
import ToastContext from "../context/ToastContext";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const comfortaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppContext>
        <ToastContext>
          <main
            className={`${poppins.variable} ${comfortaa.variable} ${inter.variable} ${montserrat.variable} min-h-screen bg-[#EBEBEB]`}
          >
            <Head>
              <title>vendr</title>
            </Head>
            <Header />
            <Component {...pageProps} />
            <Favorites />
            <Footer />
          </main>
        </ToastContext>
      </AppContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
