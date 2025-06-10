import { StoreProduct } from "@medusajs/types"
import { PergolaData, ProductInformation } from "@/types/global"
import Script from "next/script"

interface ProductSchemaProps {
  product: StoreProduct
  pergolaData: PergolaData
  currentProductInfo: ProductInformation
}

export const ProductSchema = ({
  product,
  pergolaData,
  currentProductInfo,
}: ProductSchemaProps) => {
  // 从产品变体中提取尺寸和颜色选项
  const sizeOption = product.options?.find((opt) => opt.title === "Size")
  const colorOption = product.options?.find((opt) => opt.title === "Color")

  const sizes = sizeOption?.values?.map((v) => v.value) || []
  const colors = colorOption?.values?.map((v) => v.value) || []

  const strapiCmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  const productImages = pergolaData.product_images.map(
    (image) => `${strapiCmsUrl}${image.url}`
  )

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "@id": `https://relaxureliving.com/us/products/${currentProductInfo.urlLink}`,
    name: currentProductInfo.productTitle,
    description: currentProductInfo.productDescription,
    brand: { "@type": "Brand", name: "Relaxure" },
    image: productImages,
    productGroupID: "corsica-pergola",
    variesBy: ["size", "color"],
    size: sizes,
    color: colors,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: 397,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice:
        product.variants?.[0]?.calculated_price?.calculated_amount?.toString() ||
        "0",
      highPrice:
        product.variants?.[
          product.variants.length - 1
        ]?.calculated_price?.calculated_amount?.toString() || "0",
      offerCount: product.variants?.length || 0,
      availability: "https://schema.org/InStock",
      url: `https://relaxureliving.com/us/products/${currentProductInfo.urlLink}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 100,
        returnPolicyCountry: "US",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    hasVariant:
      product.variants?.map((variant) => ({
        "@type": "Product",
        "@id": `https://relaxureliving.com/us/products/${currentProductInfo.urlLink}#${variant.id}`,
        name: `${currentProductInfo.productTitle} – ${variant.title}`,
        sku: variant.sku,
        size: sizeOption
          ? variant.options?.find((opt) => opt.option_id === sizeOption.id)
              ?.value
          : undefined,
        color: colorOption
          ? variant.options?.find((opt) => opt.option_id === colorOption.id)
              ?.value
          : undefined,
        image: productImages[0],
        offers: {
          "@type": "Offer",
          url: `https://relaxureliving.com/us/products/${currentProductInfo.urlLink}?variant=${variant.id}`,
          price: variant.calculated_price?.calculated_amount?.toString() || "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      })) || [],
  }
  console.log("schemaData", schemaData)
  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
