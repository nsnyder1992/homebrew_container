import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME
    ? process.env.NEXT_PUBLIC_APP_NAME
    : "Homebrew",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <section>
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="pt-15 pb-12 md:pt-20 md:pb-20">
              <div className="max-w-3xl mx-auto lg:max-w-none">
                <div
                  className="lg:flex lg:justify-between"
                  data-sticky-container
                >
                  <main className={inter.className + " markdown-body"}>
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
