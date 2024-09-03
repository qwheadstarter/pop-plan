import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pop-Plan",
  description: "Pop-Plan: AI-powered Plan Creator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleAnalytics gaId="G-1F18KW2V7D" />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
