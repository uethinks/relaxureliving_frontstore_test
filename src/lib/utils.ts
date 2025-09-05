import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL

export const freeServices = {
  items: [
    {
      id: 1,
      title: "Shipping",
      status: "Free",
      originalPrice: "+$999.99",
      description: "Free Shipping + Insurance",
      icon: {
        id: 1,
        name: "shipping",
        url: "/img/shipping.svg",
        width: 16,
        height: 16,
        alternativeText: "shipping",
      },
      secondaryIcon: {
        id: 2,
        name: "package",
        url: "/img/package.svg",
        width: 16,
        height: 16,
        alternativeText: "package",
      },
      secondaryText: "Delivered In 4 Weeks",
    },
    {
      id: 2,
      title: "Full Insurance",
      status: "Free",
      originalPrice: "+$999.99",
      description: "Includes Complimentary Insurance Coverage",
      icon: {
        id: 3,
        name: "shipping",
        url: "/img/shipping.svg",
        width: 16,
        height: 16,
        alternativeText: "shipping",
      },
      secondaryIcon: {
        id: 4,
        name: "package",
        url: "/img/package.svg",
        width: 16,
        height: 16,
        alternativeText: "package",
      },
      secondaryText: "Your Delivery Should Arrive In About Four Weeks",
    },
    {
      id: 3,
      title: "Warranty",
      status: "Free",
      originalPrice: "+$999.99",
      description: "100 Day Risk-Free Trial",
      icon: {
        id: 5,
        name: "shipping",
        url: "/img/shipping.svg",
        width: 16,
        height: 16,
        alternativeText: "shipping",
      },
      secondaryIcon: {
        id: 6,
        name: "warranty",
        url: "/img/warranty.svg",
        width: 16,
        height: 16,
        alternativeText: "warranty",
      },
      secondaryText: "Lifetime Warranty Included",
    },
  ],
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiUrl(path: string) {
  if (path.startsWith("/img")) {
    return path
  }
  return `${strapiUrl}${path}`
}
