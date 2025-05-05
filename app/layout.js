import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Hamdi Abdallah - Software Enginner",
  description:
    "This is the portfolio of Hamdi Abdallah. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

import ClientOnly from "./components/helper/client-only";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToastContainer />
        </ClientOnly>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ClientOnly>
            <ScrollToTop />
          </ClientOnly>
        </main>
        <Footer />
      </body>
    </html>
  );
}
