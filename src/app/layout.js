import { EB_Garamond, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const marathi = Tiro_Devanagari_Marathi({
  variable: "--font-marathi",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

export const metadata = {
  title: "Sahaja Yoga Meditation — Rahuri",
  description:
    "Sahaja Yoga meditation at Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Rahuri. Freely given.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} ${marathi.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
