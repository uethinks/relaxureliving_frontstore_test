import { CartProvider } from "@lib/context/cartContext"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  icons: {
    icon: "/img/logo.svg",
    shortcut: "/img/logo.svg",
    apple: "/img/logo.svg",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <CartProvider>
          <main className="w-full relative">
            <div className="w-full flex flex-col items-center">
              {props.children}
            </div>
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
