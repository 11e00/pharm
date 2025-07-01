import "./globals.css";

import Navbar from "./navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
        <title>Pharm</title>
        <meta charSet="utf-8" />
    </head>
    <body>
        <Navbar/>
        {children}
    </body>
    </html>
  );
}
