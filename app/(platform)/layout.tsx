import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./_components/header";
import { isLoggedIn } from "@/lib/auth/session-user";
import { Footer } from "./_components/footer";
import { AppWrapper } from "./contexts/ctxHome";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const isLogged = await isLoggedIn();
  return (
    <AppWrapper>
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col min-h-screen">{children}</div>

        <Footer />
      </body>
    </html>
    </AppWrapper>
  );
}
