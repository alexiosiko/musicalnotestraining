import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Nav from "@/components/nav";

const inter = Poppins({
	subsets: ["latin"],
	weight: "600"
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
		<ClerkProvider>
			<html lang="en" className="dark text-foreground bg-background">
				<body className={`${inter.className}`}>
					<Nav />
					<div className="p-4">
						{children}
					</div>
				</body>
				<Analytics />
			</html>
		</ClerkProvider>
	  );
}