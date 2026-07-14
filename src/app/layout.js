import { EB_Garamond, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  weight: ["400", "500", "600"],
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
  metadataBase: new URL("https://rahurisahajyoga.com"),
  title: {
    default: "Sahaja Yoga Meditation — Rahuri",
    template: "%s · Rahuri Sahaja Yoga",
  },
  description:
    "Sahaja Yoga meditation at Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Rahuri. Freely given.",
  keywords: [
    "Sahaja Yoga", "Rahuri", "meditation", "Ekadash Rudra",
    "Shri Mataji Nirmala Devi", "Kundalini", "Musalwadi", "सहज योग",
  ],
  openGraph: {
    title: "Sahaja Yoga Meditation — Rahuri",
    description:
      "Sahaja Yoga meditation at Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Rahuri. Freely given.",
    url: "https://rahurisahajyoga.com",
    siteName: "Rahuri Sahaja Yoga Meditation Center",
    images: [{ url: "/images/main.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahaja Yoga Meditation — Rahuri",
    description: "Sahaja Yoga meditation, freely given. By the banks of Rahuri.",
    images: ["/images/main.jpg"],
  },
};

export const viewport = {
  themeColor: "#f2ece0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${garamond.variable} ${marathi.variable} antialiased`}>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-card focus:text-primary focus:px-4 focus:py-2 focus:border focus:border-[hsl(var(--brass))]"
        >
          Skip to content
        </a>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
