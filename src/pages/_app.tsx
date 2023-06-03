import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Poppins, Comfortaa, Inter } from "@next/font/google";
import "~/styles/globals.css";
import { Footer, Header } from "~/components";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import AppContext from "../context/AppContext";

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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppContext>
        <main
          className={`${poppins.variable} ${comfortaa.variable} ${inter.variable} min-h-screen bg-[#EBEBEB]`}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </AppContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
