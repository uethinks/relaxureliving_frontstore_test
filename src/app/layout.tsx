import { CartProvider } from "@lib/context/cartContext"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    absolute: "Louvered Aluminum Pergola Kits | Relaxure",
  },
  description:
    "Our aluminum pergola kits feature motorized louvers, weather sensors and commercial-grade durability — turn any patio into a year-round living space.",
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
    title: "Louvered Aluminum Pergola Kits | Relaxure",
    description:
      "Our aluminum pergola kits feature motorized louvers, weather sensors and commercial-grade durability — turn any patio into a year-round living space.",
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
        {/* Google tag (gtag.js)>*/}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1DKZL3CTLM"
        ></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
            gtag('config', 'G-1DKZL3CTLM');
            gtag('config', 'AW-17039829404');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KM9V8LLR');`}
        </Script>
        {/* End Google Tag Manager */}
        <Script>
          {`
            (function(c,s,q,u,a,r,e){
              c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
              c._hjSettings={hjid:a};
              r=s.getElementsByTagName('head')[0];
              e=s.createElement('script');
              e.async=true;
              e.src=q+c._hjSettings.hjid+u;
              r.appendChild(e);
            })(window,document,'https://static.hj.contentsquare.net/c/csq-','.js',6408012);
          `}
        </Script>
        <Script
          id="organization-ldjson"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Relaxure Pergolas",
              url: "https://relaxureliving.com/",
              logo: "https://relaxureliving.com/img/logo.svg",
              description:
                "Relaxure is home to the world's smartest aluminium pergola, intelligently designed to enable four-season outdoor living. Lifetime Warranty, Built to Last for 30+ Years.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-213-566-8658",
                email: "info@relaxureliving.com",
                contactType: "Customer Service",
                areaServed: "US",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.facebook.com/people/Relaxure/61570952814126/",
                "https://www.instagram.com/relaxureliving/",
                "https://www.youtube.com/@Relaxure-Pergola",
              ],
            }),
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KM9V8LLR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <CartProvider>
          <main className="w-full relative">
            <div className="w-full flex flex-col items-center">
              {props.children}
            </div>
          </main>
        </CartProvider>

        <Script
          src="//code.tidio.co/spcvp06pvbgtarykyqq2afrepjvccury.js"
          async
        ></Script>
      </body>
    </html>
  )
}
