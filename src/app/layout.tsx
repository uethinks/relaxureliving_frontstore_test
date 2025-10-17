import { CartProvider } from "@lib/context/cartContext"
import { ImageGalleryManager, ImageGalleryProvider } from "@lib/context/imageZoomContext"
import { Metadata } from "next"
import "../styles/globals.css"
import Script from "next/script"
import { getGlobalData, getFaqData } from "@lib/cms/strapiCmsApi"
import { ReactQueryProvider } from "./providers"

// 动态生成metadata
export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getGlobalData()
  console.log("generateMetadata globalData", globalData)
  return globalData?.data?.defaultSeo?.metadataInfo || {}
}

// 动态获取组织结构化数据
async function getOrganizationSchema() {
  const globalData = await getGlobalData()
  return (
    globalData?.data?.defaultSeo?.organizationStructureData || {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Relaxure Pergolas",
      url: "https://relaxureliving.com/",
      logo: "https://relaxureliving.com/img/logo.svg",
      description:
        "Relaxure is home to the world's smartest aluminium pergola, intelligently designed to enable four-season outdoor living. Lifetime Warranty, Built to Last for 30+ Years.",
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
    }
  )
}

async function getFaqSchema() {
  const faqData = await getFaqData()
  const faqs = faqData?.data?.faqs || []

  // 提取所有问题答案对
  const mainEntity = faqs.reduce((acc: any[], category: any) => {
    if (
      category.question_and_answer &&
      Array.isArray(category.question_and_answer)
    ) {
      const questions = category.question_and_answer.map((qa: any) => ({
        "@type": "Question",
        name: qa.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: qa.Answer,
        },
      }))
      acc.push(...questions)
    }
    return acc
  }, [])

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainEntity,
  }
}
export default async function RootLayout(props: { children: React.ReactNode }) {
  const organizationSchema = await getOrganizationSchema()
  const faqSchema = await getFaqSchema()
  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preload" as="font" href="/fonts/Jost-VariableFont_wght.ttf" type="font/ttf" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
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
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
          suppressHydrationWarning
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KM9V8LLR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ReactQueryProvider>
          <CartProvider>
            <ImageGalleryProvider>
              <main className="w-full relative">
                <div className="w-full flex flex-col items-center">
                  {props.children}
                </div>
                
              </main>
            </ImageGalleryProvider>
          </CartProvider>
        </ReactQueryProvider>
        {/* Tidio 聊天组件 - 延迟加载 */}
        <Script
          id="tidio-chat-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // 延迟加载 Tidio 聊天组件
              function loadTidioChat() {
                const script = document.createElement('script');
                script.src = '//code.tidio.co/spcvp06pvbgtarykyqq2afrepjvccury.js';
                script.async = true;
                document.body.appendChild(script);
              }
              
              // 在用户交互后加载聊天组件
              let tidioLoaded = false;
              function loadTidioOnInteraction() {
                if (!tidioLoaded) {
                  tidioLoaded = true;
                  loadTidioChat();
                  // 移除事件监听器
                  document.removeEventListener('click', loadTidioOnInteraction);
                  document.removeEventListener('scroll', loadTidioOnInteraction);
                  document.removeEventListener('touchstart', loadTidioOnInteraction);
                }
              }
              
              // 添加事件监听器
              document.addEventListener('click', loadTidioOnInteraction);
              document.addEventListener('scroll', loadTidioOnInteraction);
              document.addEventListener('touchstart', loadTidioOnInteraction);
              
              // 5秒后自动加载（如果用户还没有交互）
              setTimeout(() => {
                if (!tidioLoaded) {
                  loadTidioChat();
                  tidioLoaded = true;
                }
              }, 5000);
            `
          }}
        />
        <Script id="tidio-chat-api" strategy="afterInteractive">
          {`
            (function () {
                function onTidioChatApiOpen() {
                    console.log('tidioChatApi open');
                    // gtag('event', 'online_chat');
                    console.log('window.gtag', window.gtag)
                    if (window.gtag) {
                      window.gtag("event", "online_chat", { "url": window.location.href })
                    }
                }
                function onTidioChatApiReady() {
                    // Code after chat loaded
                    console.log('tidioChatApi ready');
                    if (window.tidioChatApi) {
                        window.tidioChatApi.on('open', onTidioChatApiOpen);
                    }
                }
                console.log('window.tidioChatApi', window.tidioChatApi);
                if (window.tidioChatApi) {
                    window.tidioChatApi.on('open', onTidioChatApiReady);
                } else {
                    document.addEventListener('tidioChat-ready', onTidioChatApiReady);
                }
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
