import "./globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/footer/footer";

const ttNorms = localFont({
  src: [
    {
      path: "../fonts/tt-norms/TTNorms-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Manual",
  description: "Manual.co Frontend Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ttNorms.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
