// src/lib/cms/api.ts
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
export const postKlarnaPayment = async (formData: OceanPaymentFormData) => {
  const klarnaPaymentUrl = process.env.NEXT_PUBLIC_KLARNA_PAYMENT_URL as string
  console.log("klarnaPaymentUrl", klarnaPaymentUrl)
  
  // 创建一个表单元素
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = klarnaPaymentUrl
  form.style.display = 'none'

  // 添加所有表单字段
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value.toString()
      form.appendChild(input)
    }
  })

  // 将表单添加到文档中并提交
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
};
export const postAfterpayPayment = async (formData:OceanPaymentFormData) => {
  const afterpayPaymentUrl = process.env.NEXT_PUBLIC_AFTERPAY_PAYMENT_URL as string
  console.log("afterpayPaymentUrl", afterpayPaymentUrl)
  
  // 创建一个表单元素
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = afterpayPaymentUrl
  form.style.display = 'none'

  // 添加所有表单字段
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value.toString()
      form.appendChild(input)
    }
  })

  // 将表单添加到文档中并提交
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
};

