import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./(Prividers)/AuthProvider";
import Navbar from "./(common)/Navbar";
import Footer from "./(common)/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spot",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full pt-24">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
