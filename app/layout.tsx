import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/nav";

const inter = Poppins({
  subsets: ["latin"],
  weight: "600",
});

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const metadata: Metadata = {
  title: "Musical Notes Training",
  description: "Train your ear and practise finding and playing notes on your instrument.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" className=" text-foreground bg-background" style={{ scrollBehavior: 'smooth'}}>
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<div className="flex-grow">
					<Nav />
					<div className="p-4 max-w-4xl m-auto">
					{children}
					</div>
				</div>
				<footer className="text-xs text-muted-foreground text-center p-4">
					Copyright &copy; 2024 Cupid&apos;s Computer Shop, Inc
				</footer>
			</body>
			<Analytics />
		</html>
  );
}
