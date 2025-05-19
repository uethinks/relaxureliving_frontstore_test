// src/lib/cms/api.ts
import axiosInstance from '../axiosInstance';
type OceanPaymentFormData = {
  order_number: string
  order_currency: string
  order_amount: string
  methods: string
  account: string
  terminal: string
  key: string
  backUrl: string
  noticeUrl: string
  productSku: string
  productName: string
  productNum: string
  productPrice: string
  billing_firstName: string
  billing_lastName: string
  billing_email: string
  billing_country: string
  billing_state: string
  billing_ip: string
  signValue?: string
  order_notes: string
  billing_phone: string
}
export const postKlarnaPayment = async (formData:OceanPaymentFormData) => {
  const klarnaPaymentUrl = process.env.NEXT_PUBLIC_KLARNA_PAYMENT_URL as string
  console.log("klarnaPaymentUrl", klarnaPaymentUrl)
  try {
    const response = await axiosInstance.post(klarnaPaymentUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
export const postAfterpayPayment = async (formData:OceanPaymentFormData) => {
  const afterpayPaymentUrl = process.env.NEXT_PUBLIC_AFTERPAY_PAYMENT_URL as string
  try {
    const response = await axiosInstance.post(afterpayPaymentUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

