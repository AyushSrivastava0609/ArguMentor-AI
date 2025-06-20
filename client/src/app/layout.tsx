import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArguMentor-AI",
  description: "Your AI Voice & Text Debater",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-oid="1m3fw3.">
      <body className={inter.className} data-oid=".gj0gn4">
        {children}
      </body>
    </html>
  );
}
