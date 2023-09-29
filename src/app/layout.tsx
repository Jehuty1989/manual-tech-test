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
    {
      path: "../fonts/tt-norms/TTNorms-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Manual - Alastair Turner Frontend Assignment",
  description: "Manual.co - Alastair Turner Frontend Assignment",
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
