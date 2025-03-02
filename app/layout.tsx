import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template",
  description: "Template to start a new project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh w-dvw bg-green-800 flex flex-col`}
      >
        <Header />
          <main className="flex-1 flex items-center justify-center w-full bg-zinc-500">
            {children}

            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#888',
                  color: '#fff',
                  padding: "1rem 3rem",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                },
                success: {
                  duration: 2000,
                  style: {
                    background: '#5a5',
                    border: '2px solid green',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#a55',
                    border: '2px solid darkred',
                  },
                },
              }}
            />
          </main>
        <Footer />
      </body>
    </html>
  );
}
