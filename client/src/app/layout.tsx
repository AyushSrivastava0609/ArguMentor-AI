import "./globals.css";
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
    <html lang="en" className="dark" data-oid="tpctvh7">
      <body className="" data-oid="56y.1mh">
        {children}
      </body>
    </html>
  );
}
