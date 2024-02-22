import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
	subsets: ["latin"],
	weight: "600"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark sm:text-8xl text-6xl bg-background">
		<body className={inter.className}>
            {children}
		</body>
    </html>
  );
}
