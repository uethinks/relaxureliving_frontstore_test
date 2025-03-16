// src/lib/cms/api.ts
import axiosInstance from '../axiosInstance';

// 定义 API URL
const homePagePopulate = {
    "populate[HomepageHero][populate][0]": "BackgroundImage",
    "populate[OurPergola][populate][UsageScenarios][populate][0]": "LargeImage",
    "populate[OurPergola][populate][UsageScenarios][populate][1]": "SmallImage"
};
const API_URLS = {
  getHomePage: '/api/home-page',
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