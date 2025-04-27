// src/lib/cms/api.ts
import axiosInstance from '../axiosInstance';

// 定义 API URL
const homePagePopulate = {
    "populate[HomepageHero][populate][0]": "BackgroundImage",
    "populate[OurPergola][populate][UsageScenarios][populate][0]": "LargeImage",
    "populate[OurPergola][populate][UsageScenarios][populate][1]": "SmallImage",
    "populate[FAQ][populate][homepageFAQ][populate][0]": "question_and_answer",
    "populate[ContactUs][populate][0]": "Image",
    "populate[Features][populate][FeaturesSlider][populate][0]": "Image",
    "populate[Accessories][populate][slider][populate][0]": "largeImage",
    "populate[Accessories][populate][slider][populate][1]": "smallImage",
    "populate[OurBlog][populate][articles][populate][cover][populate]": "*",
    "populate[OurBlog][populate][articles][populate][author][populate]": "*",
    "populate[OurBlog][populate][articles][populate][category][populate]": "*"
};

const reviewsPopulate = {
    "populate[testimonials_item][populate][0]": "image",
};

const pergolaPopulate = {
    "populate[productInformations]": "*",
    "populate[relatedProductIds]": "*",
    "populate[descriptionTab][populate][0]": "image",
    "populate[descriptionTab][populate][1]": "descriptions",
    "populate[putItTogether][populate][youtubeButtons]": "*",
    "populate[putItTogether][populate][descriptions]": "*",
    "populate[productFeatures][populate][featureItem][populate][0]": "image",
    "populate[notJustAPrettyFace][populate][notJustAPrettyFaceItem][populate][notJustPrettyFaceIconContent][populate][0]": "icon",
    "populate[productAccessories][populate][productAccessoryItem][populate][0]": "image",
    "populate[boringButImportantStuff][populate][Promise][populate][0]": "Icon",
};

export const API_URLS = {
  getHomePage: '/api/home-page',
  getWarranty: '/api/warranty',
  getPrivacyPolicy: '/api/privacy-policy',
  getTermsOfService: '/api/terms-of-service',
  getRefundPolicy: '/api/refund-policy',
  getReviews: '/api/testimonials-plural',
  submitContact: '/api/contact-submissions',
  getPergola: '/api/pergola',
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
    // 获取服务条款
    const termsOfService = await axiosInstance.get(API_URLS.getTermsOfService);
    termsData['terms-of-service'] = termsOfService.data;

    // 获取隐私政策
    const privacyPolicy = await axiosInstance.get(API_URLS.getPrivacyPolicy);
    termsData['privacy-policy'] = privacyPolicy.data;

    // 获取保修条款
    const warranty = await axiosInstance.get(API_URLS.getWarranty);
    termsData['warranty'] = warranty.data;

    // 获取退货政策
    const refundPolicy = await axiosInstance.get(API_URLS.getRefundPolicy);
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

