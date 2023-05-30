import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Poppins, Comfortaa, Inter } from "@next/font/google";
import "~/styles/globals.css";
import { Footer, Header } from "~/components";

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

const MyApp: AppType = ({ Component, pageProps }) => {
  // return <Component {...pageProps} />;
  return (
    <main
      className={`${poppins.variable} ${comfortaa.variable} ${inter.variable} min-h-screen bg-[#EBEBEB]`}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default api.withTRPC(MyApp);
