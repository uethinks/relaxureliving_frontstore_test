import { CartProvider } from "@lib/context/cartContext"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    absolute: "Top Notch Smartest Pergola | Honest Pricing | Relaxure",
  },
  description:
    "Stop overpaying for outdoor shade. Relaxure's pergolas offer commercial-grade durability, smartest home integration, and transparent pricing. Backed by a 15-year warranty and 24/7 support.",
  applicationName: "Relaxure",
  keywords: ["pergola", "outdoor shade", "smart home", "relaxure"],
  authors: [{ name: "Relaxure" }],
  creator: "Relaxure",
  publisher: "Relaxure",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Relaxure",
    title: "Top Notch Smartest Pergola | Honest Pricing | Relaxure",
    description:
      "Stop overpaying for outdoor shade. Relaxure's pergolas offer commercial-grade durability, smartest home integration, and transparent pricing. Backed by a 15-year warranty and 24/7 support.",
    url: "/",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CartProvider>
          <main className="w-full relative">
            <div className="w-full flex flex-col items-center">
              {props.children}
            </div>
          </main>
        </CartProvider>

        <Script
          id="gorgias-chat-widget-install-v3"
          src="https://config.gorgias.chat/bundle-loader/01JS9W54W6NK3XC6TQ1DKVER8F"
        />
      </body>
    </html>
  )
}
