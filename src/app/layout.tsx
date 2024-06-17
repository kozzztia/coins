import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "css/globals.css";
import {Header} from "components/index";
import star from 'images/star.png'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "coins",
  description: "testing coins project",
  icons: {
    icon: star.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
