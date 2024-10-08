import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { instrumentSans } from "@/utils/fonts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "devlinks",
  description: "Share all your links in one bundle and add class to your portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 pb-10`}
        >
          {children}
        </body>
        {/* <footer className="h-fit flex flex-col justify-end"> 
          <div className={`font-extrabold ${instrumentSans.className} text-[#633cff] text-xs float-right px-2 py-2`}>
            Made by Wilfrid: OWK
          </div>
        </footer> */}
      </AuthProvider>
    </html>
  );
}
