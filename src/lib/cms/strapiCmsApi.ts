// src/lib/cms/api.ts
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { unstable_cache } from 'next/cache';

// 定义 API URL
const homePagePopulate = {
    "populate[HomepageHero][populate][0]": "BackgroundImage",
    "populate[OurPergola][populate][UsageScenarios][populate][0]": "LargeImage",
    "populate[OurPergola][populate][UsageScenarios][populate][1]": "SmallImage",
    "populate[FAQ][populate][homepageFAQ][populate][0]": "question_and_answer",
    "populate[ContactUs][populate][0]": "Image",
    "populate[Features][populate][FeaturesSlider][populate][0]": "Image",
    "populate[Accessories][populate][slider][populate][0]": "largeImage",
    "populate[OurPromise][populate][Promise][populate][0]": "Icon",
    "populate[Accessories][populate][slider][populate][1]": "smallImage",
    "populate[OurBlog][populate][articles][populate][cover][populate]": "*",
    "populate[OurBlog][populate][articles][populate][author][populate]": "*",
    "populate[OurBlog][populate][articles][populate][category][populate]": "*",
    "populate[credential][populate][images][populate]": "*",
    "populate[seo][populate][0]": "shareImage"
};

const reviewsPopulate = {
    "populate[testimonials_item][populate][0]": "image",
};

const pergolaPopulate = {
    "populate[productInformations]": "*",
    "populate[relatedProductIds]": "*",
    "populate[product_images][fields][0]": "*",
    "populate[descriptionTab][populate][0]": "image",
    "populate[descriptionTab][populate][1]": "descriptions",
    "populate[productFeatures][populate][featureItem][populate][0]": "image",
    "populate[productAccessories][populate][productAccessoryItem][populate][0]": "image",
    "populate[credential][populate][images][populate]": "*",
    "populate[product_overview][populate][product_overview_description]": "*",
    "populate[product_overview][populate][pergola_size_technical_specs][populate][0]": "images",
    "populate[product_overview][populate][shipping_and_returns]": "*",
    "populate[product_overview][populate][fast_easy_assembly][populate][youtubeButtons]": "*",
    "populate[product_overview][populate][fast_easy_assembly][populate][descriptions]": "*",
    "populate[product_overview][populate][onehundred_days_free_risk][populate][0]": "image",
    "populate[product_overview][populate][lifetime_warranty]": "*",
    "populate[faq][populate][homepageFAQ][populate][0]": "question_and_answer",
    "populate[get_in_touch]": "*",
    "populate[sample_kit][populate][0]": "product_image",
    "populate[seo][populate][0]": "shareImage"
};
const faqPopulate = {
  "populate[faqs][populate][0]": "question_and_answer",
};
const heaterPopulate = {
  "populate[productInformations]": "*",
  "populate[product_images][fields][0]": "*",
};
const shadesPopulate = {
  "populate[productInformations]": "*",
  "populate[product_images][fields][0]": "*",
};
const glassdoorPopulate = {
  "populate[productInformations]": "*",
  "populate[product_images][fields][0]": "*",
};
const landingPagePopulate = {
  "populate[hero][populate][0]": "BackgroundImage",
  "populate[landing_slider][populate][images][fields][0]": "*",
  "populate[good_memory][populate][0]": "image",
};
const menuPopulate = {
  "populate[menu_item][populate]": "sub_menu_item",
};
const globalPopulate = {
  "populate[0]": "defaultSeo",
};

const termsPopulate = {
  "populate[seo][populate][0]": "shareImage"
};
export const API_URLS = {
  getHomePage: '/api/home-page',
  getWarranty: '/api/warranty',
  getPrivacyPolicy: '/api/privacy-policy',
  getTermsOfService: '/api/terms-of-service',
  getShippingPolicy: '/api/shipping-policy',
  getIntellectualPropertyRights: '/api/intellectual-property-right',
  getRefundPolicy: '/api/refund-policy',
  getReviews: '/api/testimonials-plural',
  submitContact: '/api/contact-submissions',
  getPergola: '/api/pergola',
  getHeater: '/api/heater',
  getShades: '/api/shades-screen',
  getGlassdoor: '/api/glass-door',
  sendKlaviyoTrackInfo: '/api/contact-submissions',
  getLandingPage: '/api/landing',
  getMenu: '/api/menu',
  getAccessoriesPage: '/api/accessories-page',
  getFaqData: '/api/faq-page',
  getGlobalData: '/api/global',
};

// 获取所有项目
export const getHomePage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getHomePage, {
        params: homePagePopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// 获取所有条款数据
export const getAllTerms = async () => {
  const termsData: Record<string, any> = {};
  
  try {
    // Intellectual Property Rights
    const intellectualPropertyRights = await axiosInstance.get(API_URLS.getIntellectualPropertyRights, {
      params: termsPopulate
    });
    termsData['intellectual-property-right'] = intellectualPropertyRights.data;
    // Shipping Policy 
    const shippingPolicy = await axiosInstance.get(API_URLS.getShippingPolicy, {
      params: termsPopulate
    });
    termsData['shipping-policy'] = shippingPolicy.data;
    // 获取服务条款
    const termsOfService = await axiosInstance.get(API_URLS.getTermsOfService, {
      params: termsPopulate
    });
    termsData['terms-of-service'] = termsOfService.data;

    // 获取隐私政策
    const privacyPolicy = await axiosInstance.get(API_URLS.getPrivacyPolicy, {
      params: termsPopulate
    });
    termsData['privacy-policy'] = privacyPolicy.data;

    // 获取保修条款
    const warranty = await axiosInstance.get(API_URLS.getWarranty, {
      params: termsPopulate
    });
    termsData['warranty'] = warranty.data;

    // 获取退货政策
    const refundPolicy = await axiosInstance.get(API_URLS.getRefundPolicy, {
      params: termsPopulate
    });
    termsData['refund-policy'] = refundPolicy.data;

    return termsData;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

// 获取用户评论
export const getReviews = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getReviews, {
        params: reviewsPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// 获取 Pergola 数据
export const getPergola = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getPergola, {
        params: pergolaPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pergola data:', error);
    throw error;
  }
};
// 获取 Pergola 数据
export const getGlassdoor = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getGlassdoor, {
        params: glassdoorPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Glassdoor data:', error);
    throw error;
  }
};
// 获取 Pergola 数据
export const getHeater = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getHeater, {
        params: heaterPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching heater data:', error);
    throw error;
  }
};
// 获取 Pergola 数据
export const getShades = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getShades, {
        params: shadesPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shades data:', error);
    throw error;
  }
};

// 提交联系表单
export const submitContactForm = async (formData: {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await axiosInstance.post(API_URLS.submitContact, {
      data: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        message: formData.message
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error('Permission denied. Please check Strapi CMS permissions for contact-submissions collection.');
      throw new Error('Permission denied. Please check Strapi CMS permissions for contact-submissions collection.');
    }
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const sendKlaviyoContactUsForm = async (info: any) => {
  try {
      await axios.post('/api/klaviyo/track', {
          event: 'contact us submission',
          customer_properties: {
              $email: info.email,
              $first_name: info.fullName,
          },
          properties: {
            fullName: info.fullName,
            phoneNumber: info.phoneNumber,
            email: info.email,
            message: info.message
          }
      })
      console.log('Klaviyo event sent')
  } catch (error) {
      console.error('Failed to send Klaviyo event:', error)
  }
}

export const getLandingPage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getLandingPage, {
      params: landingPagePopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching landing page data:', error, API_URLS.getLandingPage);
    throw error;
  }
};

// 获取菜单数据
export const getMenu = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getMenu, {
      params: menuPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error, API_URLS.getMenu);
    throw error;
  }
};

// 获取菜单数据
export const getAccessoriesPage = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getAccessoriesPage);
    return response.data;
  } catch (error) {
    console.error('Error fetching accessories page data:', error, API_URLS.getAccessoriesPage);
    throw error;
  }
};

export const getFaqData = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getFaqData, {
      params: faqPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching faq data:', error, API_URLS.getFaqData);
    throw error;
  }
};

export const getGlobalData = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.getGlobalData, {
      params: globalPopulate
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching global data:', error, API_URLS.getGlobalData);
    throw error;
  }
};