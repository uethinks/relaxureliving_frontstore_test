"use client"
import React, { useState } from "react"
import {
  sendKlaviyoContactUsForm,
  submitContactForm,
} from "@lib/cms/strapiCmsApi"
import { Image } from "types/global"

interface ContactUsProps {
  id: number
  DescriptionOnImage: string
  Email: string
  FormDescription: string
  FullName: string
  Image: Image | null
  Message: string
  PhoneNumber: string
  SendButton: string
}

interface FormData {
  fullName: string
  phoneNumber: string
  email: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  message?: string
}

export const ContactUs = ({
  contactUs,
}: {
  contactUs: ContactUsProps
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address"
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
    // 清除对应字段的错误信息
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        message: formData.message,
      })
      await sendKlaviyoContactUsForm({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        message: formData.message,
      })
      setSubmitStatus("success")
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL
  const imageUrl = contactUs.Image?.url

  return (
    <div
      id="contact"
      className="flex flex-col lg:flex-row w-full justify-center items-center gap-4 lg:gap-[87px]"
    >
      <div className="flex relative justify-center w-full lg:w-auto h-[490px] lg:h-[947px] items-center">
        <img
          className="h-[490px] lg:h-[947px] aspect-[695/947] w-full object-cover rounded-[20px]"
          alt="Unsplash"
          src={imageUrl ? `${strapiUrl}${imageUrl}` : ""}
        />

        <div className="absolute bottom-10 left-0 w-[80%] lg:w-full px-4 py-2.5">
          <p className="font-bold font-merriweather text-white text-[18px] lg:text-[32px] leading-[44.8px] tracking-[0]">
            {contactUs.DescriptionOnImage}
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-auto lg:h-[964px] aspect-[528/964] items-center">
        <div className="flex flex-col w-full px-4 py-10 items-center gap-[30px] bg-[#f8f8f8] rounded-[18.16px] border border-solid border-[#ffffff6e] backdrop-blur-[32.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(32.4px)_brightness(100%)]">
          <div className="relative w-[102px] h-[82.21px]">
            <div className="relative w-[253px] h-[232px] -top-[61px] -left-[86px]">
              <img
                className="absolute w-[47px] h-[58px] top-[76px] left-[140px]"
                alt="Group"
                src="/img/group-266.png"
              />
              <img
                className="absolute w-[253px] h-[232px]"
                alt="Vector"
                src="/img/vector-1.svg"
              />
              <img
                className="absolute w-[102px] h-[111px] top-[61px] left-[71px]"
                alt="Group"
                src="/img/group-265.png"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-[52.66px] w-full">
            <div className="flex flex-col items-center gap-[18.16px] w-full">
              <p className="font-heading-2 text-black text-[18px] lg:text-[36px] font-medium text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)]">
                {contactUs.FormDescription}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-[36.32px]"
            >
              <div className="w-full flex flex-col items-start gap-[29.05px]">
                <div className="w-full flex flex-col items-start gap-[29.05px]">
                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-relaxure-sub-heading-18 font-normal text-sm tracking-[0] leading-[15.4px]">
                        {contactUs.FullName} *
                      </div>
                      <input
                        className={`w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid ${
                          errors.fullName
                            ? "border-red-500"
                            : "border-[#d8dadc]"
                        } focus:outline-none`}
                        id="fullName"
                        placeholder={contactUs.FullName}
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      {errors.fullName && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-relaxure-sub-heading-18 font-normal text-sm tracking-[0] leading-[15.4px]">
                        {contactUs.PhoneNumber}
                      </div>
                      <input
                        className="w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid border-[#d8dadc] focus:outline-none"
                        id="phoneNumber"
                        placeholder={contactUs.PhoneNumber}
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-relaxure-sub-heading-18 font-normal text-sm tracking-[0] leading-[15.4px]">
                        {contactUs.Email} *
                      </div>
                      <input
                        className={`w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid ${
                          errors.email ? "border-red-500" : "border-[#d8dadc]"
                        } focus:outline-none`}
                        id="email"
                        placeholder={contactUs.Email}
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start gap-[3.63px]">
                    <div className="w-full flex flex-col items-start gap-[5.45px]">
                      <div className="font-relaxure-sub-heading-18 font-normal text-sm tracking-[0] leading-[15.4px]">
                        Message *
                      </div>
                      <textarea
                        className={`w-full px-[14.53px] py-[16.34px] bg-white rounded-[9.08px] border border-solid ${
                          errors.message ? "border-red-500" : "border-[#d8dadc]"
                        } focus:outline-none resize-vertical min-h-[120px]`}
                        id="message"
                        placeholder={contactUs.Message}
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      {errors.message && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="text-[#072f6c] mt-2">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-red-600 mt-2">
                  Sorry, we couldn't send your message. Please try again or
                  contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[43.58px]"
              >
                <div
                  className={`h-full flex items-center justify-center gap-[var(--3-spacing-spacing-md)] px-[12.71px] py-[9.08px] ${
                    isSubmitting ? "bg-gray-400" : "bg-[#072f6c]"
                  } rounded-[var(--2-radius-radius-md)]`}
                >
                  <div className="font-medium text-[16px] font-relaxure-sub-heading-18 text-variable-collection-beige-brand">
                    {isSubmitting ? "Sending..." : contactUs.SendButton}
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
