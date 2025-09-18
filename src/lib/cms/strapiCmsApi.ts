// src/lib/cms/api.ts
import axios from "axios"
import axiosInstance from "../axiosInstance"

const v2HeroBannerPopulate = {
  populate: {
    button: {
      populate: "*",
    },
    backgroundImage: {
      populate: "*",
    },
  },
}

const v2ServiceSnapshotsPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2HeroProductSectionPopulate = {
  populate: {
    button: {
      populate: "*",
    },
    image: {
      populate: "*",
    },
  },
}

const v2PressSliderPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2CraftsmanshipPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2OccasionsPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2RainResistancePopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2FeatureGridPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2PromoBannerPopulate = {
  populate: {
    content: {
      populate: "*",
    },
    backgroundImage: {
      populate: "*",
    },
  },
}

const v2DualOfferSectionPopulate = {
  populate: {
    iconItems: {
      populate: "*",
    },
    cardItems: {
      populate: "*",
    },
  },
}

const v2TestimonialsSectionPopulate = {
  populate: {
    button: {
      populate: "*",
    },
    items: {
      populate: "*",
    },
  },
}

const v2FaqSectionPopulate = {
  populate: {
    items: {
      populate: "*",
    },
    button: {
      populate: "*",
    },
    backgroundImage: {
      populate: "*",
    },
  },
}

const v2FeatureItemsPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const v2FeatureCardsPopulate = {
  populate: {
    items: {
      populate: "*",
    },
  },
}

const accessoriesPagePopulate = {
  populate: {
    banner: {
      populate: "*",
    },
  },
}

// 定义 API URL
const homePagePopulate = {
  populate: {
    sections: {
      // asking to populate the blocks dynamic zone
      on: {
        // using a detailed population strategy to explicitly define what you want
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
      },
    },
  },
}

const reviewsPopulate = {
  populate: {
    testimonials_item: {
      populate: ["image"],
    },
  },
}

const standardPergolaPopulate = {
  populate: {
    relatedProductIds: "*",
    productImages: {
      fields: ["*"],
    },
    productSections: {
      // asking to populate the blocks dynamic zone
      on: {
        // using a detailed population strategy to explicitly define what you want
        "blocks.v2-feature-items": v2FeatureItemsPopulate,
      },
    },
    descriptionSections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}

const customPergolaPopulate = {
  populate: {
    sections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}

const pergolaPopulate = {
  populate: {
    productInformations: "*",
    relatedProductIds: "*",
    product_images: {
      fields: ["*"],
    },
    descriptionTab: {
      populate: ["image", "descriptions"],
    },
    productFeatures: {
      populate: {
        featureItem: {
          populate: ["image"],
        },
      },
    },
    productAccessories: {
      populate: {
        productAccessoryItem: {
          populate: ["image"],
        },
      },
    },
    credential: {
      populate: {
        images: {
          populate: "*",
        },
      },
    },
    product_overview: {
      populate: {
        product_overview_description: "*",
        pergola_size_technical_specs: {
          populate: ["images"],
        },
        shipping_and_returns: "*",
        fast_easy_assembly: {
          populate: {
            youtubeButtons: "*",
            descriptions: "*",
          },
        },
        onehundred_days_free_risk: {
          populate: ["image"],
        },
        lifetime_warranty: "*",
      },
    },
    faq: {
      populate: {
        homepageFAQ: {
          populate: ["question_and_answer"],
        },
      },
    },
    get_in_touch: "*",
    sample_kit: {
      populate: ["product_image"],
    },
    seo: {
      populate: ["shareImage"],
    },
  },
}
const faqPopulate = {
  populate: {
    faqs: {
      populate: ["question_and_answer"],
    },
  },
}
const heaterPopulate = {
  populate: {
    productInformations: "*",
    productImages: {
      fields: ["*"],
    },
    sections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}
const shadesPopulate = {
  populate: {
    productInformations: "*",
    productImages: {
      fields: ["*"],
    },
    sections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}

const sampleKitPopulate = {
  populate: {
    productImages: {
      fields: ["*"],
    },
    sections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}

const glassdoorPopulate = {
  populate: {
    productInformations: "*",
    productImages: {
      fields: ["*"],
    },
    sections: {
      on: {
        "blocks.v2-hero-banner": v2HeroBannerPopulate,
        "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
        "blocks.v2-hero-product-section": v2HeroProductSectionPopulate,
        "blocks.v2-press-slider": v2PressSliderPopulate,
        "blocks.v2-craftsmanship": v2CraftsmanshipPopulate,
        "blocks.v2-occasions": v2OccasionsPopulate,
        "blocks.v2-rain-resistance": v2RainResistancePopulate,
        "blocks.v2-feature-grid": v2FeatureGridPopulate,
        "blocks.v2-promo-banner": v2PromoBannerPopulate,
        "blocks.v2-dual-offer-section": v2DualOfferSectionPopulate,
        "blocks.v2-testimonials-section": v2TestimonialsSectionPopulate,
        "blocks.v2-faq-section": v2FaqSectionPopulate,
        "blocks.v2-feature-cards": v2FeatureCardsPopulate,
      },
    },
  },
}
const landingPagePopulate = {
  populate: {
    hero: {
      populate: ["BackgroundImage"],
    },
    landing_slider: {
      populate: {
        images: {
          fields: ["*"],
        },
      },
    },
    good_memory: {
      populate: ["image"],
    },
  },
}
const menuPopulate = {
  populate: {
    menu_item: {
      populate: {
        sub_menu_item: {
          populate: "*",
        },
        custom_sub_menu_item: {
          populate: {
            banner: {
              fields: "url",
            },
            iconText: {
              populate: {
                icon: {
                  fields: "url",
                },
              },
            },
          },
        },
        sub_banner_menu_item: {
          populate: {
            banner: {
              fields: "url",
            },
          },
        },
      },
    },
  },
}
const globalPopulate = {
  populate: ["defaultSeo"],
}

const termsPopulate = {
  populate: {
    seo: {
      populate: ["shareImage"],
    },
  },
}
export const API_URLS = {
  getHomePage: "/api/v2-home-page",
  getWarranty: "/api/warranty",
  getPrivacyPolicy: "/api/privacy-policy",
  getTermsOfService: "/api/terms-of-service",
  getShippingPolicy: "/api/shipping-policy",
  getIntellectualPropertyRights: "/api/intellectual-property-right",
  getRefundPolicy: "/api/refund-policy",
  getReviews: "/api/testimonials-plural",
  submitContact: "/api/contact-submissions",
  getStandardPergola: "/api/v2-pdp-standardize",
  getCustomPergola: "/api/v2-pdp-custom-made",
  getPergola: "/api/pergola",
  getHeater: "/api/heater",
  getShades: "/api/shades-screen",
  getSampleKit: "/api/v2-pdp-sample-kit",
  getGlassdoor: "/api/glass-door",
  sendKlaviyoTrackInfo: "/api/contact-submissions",
  getLandingPage: "/api/landing",
  getMenu: "/api/menu",
  getAccessoriesPage: "/api/accessories-page",
  getFaqData: "/api/faq-page",
  getGlobalData: "/api/global",
  getContactUs: "/api/v2-contact-us",
  getAboutUs: "/api/about",
  getDeliveryWarranty: "/api/v2-delivery-warranty",
  getOurCollection: "/api/v2-our-collection",
  getFAQCategories: "/api/v2-faq-categories",
  getResourceLibraries: "/api/v2-resource-libraries",
  getPress: "/api/presses",
  getTags: "/api/v2-tags",
  getBlogs: "/api/v2-blogs",
  getPolicies: "/api/v2-policies",
  submitBecomeDealer: "/api/v2-become-dealer-submissions",
}

// 获取所有项目
export const getContactUs = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getContactUs, {
      params: { populate: "*" },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取所有项目
export const getHomePage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getHomePage, {
      params: homePagePopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取所有条款数据
export const getAllTerms = async () => {
  const termsData: Record<string, any> = {}

  try {
    // Intellectual Property Rights
    const intellectualPropertyRights = await axiosInstance.get(
      API_URLS.getIntellectualPropertyRights,
      {
        params: termsPopulate,
      }
    )
    termsData["intellectual-property-right"] = intellectualPropertyRights.data
    // Shipping Policy
    const shippingPolicy = await axiosInstance.get(API_URLS.getShippingPolicy, {
      params: termsPopulate,
    })
    termsData["shipping-policy"] = shippingPolicy.data
    // 获取服务条款
    const termsOfService = await axiosInstance.get(API_URLS.getTermsOfService, {
      params: termsPopulate,
    })
    termsData["terms-of-service"] = termsOfService.data

    // 获取隐私政策
    const privacyPolicy = await axiosInstance.get(API_URLS.getPrivacyPolicy, {
      params: termsPopulate,
    })
    termsData["privacy-policy"] = privacyPolicy.data

    // 获取保修条款
    const warranty = await axiosInstance.get(API_URLS.getWarranty, {
      params: termsPopulate,
    })
    termsData["warranty"] = warranty.data

    // 获取退货政策
    const refundPolicy = await axiosInstance.get(API_URLS.getRefundPolicy, {
      params: termsPopulate,
    })
    termsData["refund-policy"] = refundPolicy.data

    return termsData
  } catch (error) {
    console.error("Error fetching terms:", error)
    throw error
  }
}

// 获取用户评论
export const getReviews = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getReviews, {
      params: reviewsPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }
}

// 获取 Pergola 数据
export const getPergola = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getPergola, {
      params: pergolaPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching pergola data:", error)
    throw error
  }
}

// 获取 Standard Pergola 数据
export const getStandardPergola = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getStandardPergola, {
      params: standardPergolaPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching pergola data:", error)
    throw error
  }
}

// 获取 Standard Pergola 数据
export const getCustomPergola = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getCustomPergola, {
      params: customPergolaPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching pergola data:", error)
    throw error
  }
}

// 获取 Pergola 数据
export const getGlassdoor = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getGlassdoor, {
      params: glassdoorPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching Glassdoor data:", error)
    throw error
  }
}
// 获取 Pergola 数据
export const getHeater = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getHeater, {
      params: heaterPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching heater data:", error)
    throw error
  }
}
// 获取 Pergola 数据
export const getShades = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getShades, {
      params: shadesPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching shades data:", error)
    throw error
  }
}
// 获取 Pergola 数据
export const getSampleKit = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getSampleKit, {
      params: sampleKitPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching heater data:", error)
    throw error
  }
}

// 提交联系表单
export const submitContactForm = async (formData: {
  fullName: string
  phoneNumber: string
  email: string
  message: string
  inquiryType: string
}) => {
  try {
    const response = await axiosInstance.post(API_URLS.submitContact, {
      data: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        message: formData.message,
        inquiryType: formData.inquiryType,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error(
        "Permission denied. Please check Strapi CMS permissions for contact-submissions collection."
      )
      throw new Error(
        "Permission denied. Please check Strapi CMS permissions for contact-submissions collection."
      )
    }
    console.error("Error submitting contact form:", error)
    throw error
  }
}

export const sendKlaviyoContactUsForm = async (info: any) => {
  try {
    await axios.post("/api/klaviyo/track", {
      event: "contact us submission",
      customer_properties: {
        $email: info.email,
        $first_name: info.fullName,
      },
      properties: {
        fullName: info.fullName,
        phoneNumber: info.phoneNumber,
        email: info.email,
        message: info.message,
      },
    })
    console.log("Klaviyo event sent")
  } catch (error) {
    console.error("Failed to send Klaviyo event:", error)
  }
}

export const getLandingPage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getLandingPage, {
      params: landingPagePopulate,
    })
    return response.data
  } catch (error) {
    console.error(
      "Error fetching landing page data:",
      error,
      API_URLS.getLandingPage
    )
    throw error
  }
}

// 获取菜单数据
export const getMenu = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getMenu, {
      params: menuPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching menu data:", error, API_URLS.getMenu)
    throw error
  }
}

// 获取菜单数据
export const getAccessoriesPage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getAccessoriesPage, {
      params: accessoriesPagePopulate,
    })
    return response.data
  } catch (error) {
    console.error(
      "Error fetching accessories page data:",
      error,
      API_URLS.getAccessoriesPage
    )
    throw error
  }
}

export const getFaqData = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getFaqData, {
      params: faqPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching faq data:", error, API_URLS.getFaqData)
    throw error
  }
}

export const getGlobalData = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getGlobalData, {
      params: globalPopulate,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching global data:", error, API_URLS.getGlobalData)
    throw error
  }
}

// 获取关于我们
export const getAboutUs = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getAboutUs, {
      params: {
        populate: {
          sections: {
            on: {
              "blocks.v2-promo-banner": v2PromoBannerPopulate,
              "blocks.v2-faq-section": v2FaqSectionPopulate,
              "blocks.v2-service-snapshots": v2ServiceSnapshotsPopulate,
              "blocks.v2-feature-cards": v2FeatureCardsPopulate,
            },
          },
        },
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取delivery & warranty
export const getDeliveryWarranty = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getDeliveryWarranty, {
      params: {
        populate: {
          sections: {
            on: {
              "blocks.v2-faq-section": v2FaqSectionPopulate,
            },
          },
        },
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 our collection
export const getOurCollection = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getOurCollection, {
      params: {
        populate: {
          sections: {
            on: {
              "blocks.v2-hero-banner": v2HeroBannerPopulate,
              "blocks.v2-rain-resistance": v2RainResistancePopulate,
              "blocks.v2-collection-content": {
                populate: "*",
              },
            },
          },
        },
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 faq category 列表
export const getFAQCategories = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getFAQCategories, {
      params: {
        populate: "*",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 resource library 列表
export const getResourceLibrary = async ({
  current = 1,
  pageSize = 10,
  category,
}: {
  current?: number
  pageSize?: number
  category?: string
}) => {
  try {
    const { data } = await axiosInstance.get(API_URLS.getResourceLibraries, {
      params: {
        populate: "*",
        pagination: {
          page: current,
          pageSize,
        },
        filters: {
          category,
        },
      },
    })

    return {
      data: data.data,
      nextCursor: data.data?.length === pageSize ? current + 1 : undefined,
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 press 列表
export const getPress = async ({
  current = 1,
  pageSize = 10,
}: {
  current?: number
  pageSize?: number
}) => {
  try {
    const { data } = await axiosInstance.get(API_URLS.getPress, {
      params: {
        populate: "*",
        pagination: {
          page: current,
          pageSize,
        },
      },
    })

    return {
      data: data.data,
      nextCursor: data.data?.length === pageSize ? current + 1 : undefined,
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 tag 列表
export const getTags = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getTags, {
      params: {
        populate: "*",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取 blog 列表
export const getBlogs = async ({
  current = 1,
  pageSize = 6,
  tagIds = [],
  sort,
  filters,
}: {
  current?: number
  pageSize?: number
  tagIds?: string[]
  sort?: any
  filters?: any
}) => {
  try {
    const response = await axiosInstance.get(API_URLS.getBlogs, {
      params: {
        populate: "*",
        pagination: {
          page: current,
          pageSize,
        },
        filters: {
          tags: {
            id: { $in: tagIds },
          },
          ...filters,
        },
        sort,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取博客详情
export const getBlog = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${API_URLS.getBlogs}/${id}`, {
      params: {
        populate: "*",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取条款列表
export const getPolicies = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getPolicies, {
      params: {
        fields: ["documentId", "title"],
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 获取条款详情
export const getPolicy = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${API_URLS.getPolicies}/${id}`, {
      params: {
        populate: "*",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching items:", error)
    throw error
  }
}

// 提交 become dealer
export const submitBecomeDealer = async (formData: any) => {
  try {
    const response = await axiosInstance.post(API_URLS.submitBecomeDealer, {
      data: formData,
    })
    return response.data
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error(
        "Permission denied. Please check Strapi CMS permissions for contact-submissions collection."
      )
      throw new Error(
        "Permission denied. Please check Strapi CMS permissions for contact-submissions collection."
      )
    }
    console.error("Error submitting contact form:", error)
    throw error
  }
}
