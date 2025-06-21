import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArguMentor-AI",
  description: "Your AI Voice & Text Debater",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-oid="94.bhp3">
      <body className={inter.className} data-oid="4s7h2a3">
        {children}
      </body>
    </html>
  );
}
