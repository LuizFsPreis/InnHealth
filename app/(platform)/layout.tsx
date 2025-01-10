import { Inter } from "next/font/google";
import { Header } from "./_components/header";
import { isLoggedIn } from "@/lib/auth/session-user";
import { Footer } from "./_components/footer";
import { HomeWrapper } from "../contexts/ctxHome";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const isLogged = await isLoggedIn();
  return (
    <HomeWrapper>
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col min-h-screen bg-gray-100">{children}</div>
        <Footer />
      </body>
    </html>
    </HomeWrapper>
  );
}
