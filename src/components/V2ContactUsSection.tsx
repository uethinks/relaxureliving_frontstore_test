"use client"
/* NOSONAR */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  getContactUs,
  sendKlaviyoContactUsForm,
  submitContactForm,
} from "@lib/cms/strapiCmsApi"
import { useQuery } from "@tanstack/react-query"
import { Mail, MessageCircle, Phone, Sun, User } from "lucide-react"
import React, { useEffect, useState } from "react"

// 定义常量以避免重复的字符串字面量
const BORDER_ERROR_CLASS = "border-red-500"
const BORDER_DEFAULT_CLASS = "border-[#d9d9d9]"

interface ContactUsProps {
  id: number
  FullName: string
  Email: string
  PhoneNumber: string
  InquiryAbout: string
  Message: string
  InquiryTypes: string[]
}

interface FormData {
  fullName: string
  phoneNumber: string
  email: string
  inquiry: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  message?: string
}

export const V2ContactUsSection = (props: {
  title?: string
  description?: string
}): React.JSX.Element => {
  const {
    data: contactUsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contactUs"],
    queryFn: getContactUs,
  })

  const data = contactUsData?.data

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    inquiry: "Sales", // Safe default value
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )
  const [errors, setErrors] = useState<FormErrors>({})

  // Update form when data loads
  useEffect(() => {
    if (data?.InquiryTypes && data.InquiryTypes.length > 0) {
      setFormData((prev) => ({
        ...prev,
        inquiry: data.InquiryTypes[0],
      }))
    }
  }, [data])

  // Skeleton loading component
  const FormSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name Skeleton */}
        <div className="relative h-[48px]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-full bg-gray-200 rounded border border-gray-200"></div>
        </div>

        {/* Email Skeleton */}
        <div className="relative h-[48px]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-full bg-gray-200 rounded border border-gray-200"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone Number Skeleton */}
        <div className="relative h-[48px]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-full bg-gray-200 rounded border border-gray-200"></div>
        </div>

        {/* Inquiry About Skeleton */}
        <div className="relative h-[48px]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-full bg-gray-200 rounded border border-gray-200"></div>
        </div>
      </div>

      {/* Message Skeleton */}
      <div className="relative">
        <div className="absolute left-4 top-4 z-10">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full h-48 bg-gray-200 rounded border border-gray-200"></div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="flex justify-center pt-6">
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-8">
      <div className="text-red-500 text-lg mb-4">
        Unable to load form data. Please try refreshing the page.
      </div>
      <div className="text-[#8c877c] mb-6">
        You can still use the form below with default settings.
      </div>
    </div>
  )

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
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // 清除对应字段的错误信息
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiry: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!validateForm()) {
      return
    }
    if (typeof window !== "undefined") {
      window.gtag("event", "conversion", {
        send_to: "AW-17039829404/w72TCLXX2sAaEJzTnL0_",
      })
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
        inquiry: data?.InquiryTypes?.[0] || "Sales",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="contact" className="max-w-[1074px] w-full py-16 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-semibold text-[#140e02] mb-5 leading-tight">
          {props?.title || "Got something specific in mind, send us a message"}
        </h1>
        <p className="text-[#8c877c] text-base mx-auto">
          {props?.description ||
            "If you fill out the contact form below, one of our representatives will reach back out to you in a timely manner."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {isLoading ? (
          <FormSkeleton />
        ) : isError ? (
          <>
            <ErrorState />
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative h-[48px]">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <User className="w-5 h-5 text-[#ffbf3c]" />
                  </div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                      errors.fullName
                        ? BORDER_ERROR_CLASS
                        : BORDER_DEFAULT_CLASS
                    }`}
                    required
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="relative h-[48px]">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Mail className="w-5 h-5 text-[#ffbf3c]" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                      errors.email ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                    }`}
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="relative h-[48px]">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Phone className="w-5 h-5 text-[#ffbf3c]" />
                  </div>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="pl-12 py-4 h-full bg-white border-[#d9d9d9] text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c]"
                  />
                </div>

                {/* Inquiry About */}
                <div className="relative h-[48px]">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                    <Sun className="w-5 h-5 text-[#ffbf3c]" />
                  </div>
                  <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                    <span className="text-[#8c877c] text-sm">
                      Inquiry About
                    </span>
                  </div>
                  <Select
                    value={formData.inquiry}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full pl-36 h-full bg-white border-[#d9d9d9] text-[#140e02] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] flex items-center">
                      <SelectValue className="pb-0" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#d9d9d9]">
                      <SelectItem
                        value="Sales"
                        className="text-[#140e02] focus:bg-[#ffbf3c]/10"
                      >
                        Sales
                      </SelectItem>
                      <SelectItem
                        value="Support"
                        className="text-[#140e02] focus:bg-[#ffbf3c]/10"
                      >
                        Support
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <div className="absolute left-4 top-4 z-10">
                  <MessageCircle className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`pl-12 py-4 bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] resize-vertical ${
                    errors.message ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                  }`}
                  required
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <User className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="text"
                  name="fullName"
                  placeholder={data?.FullName || "Full Name"}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.fullName ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                  }`}
                  required
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Mail className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder={data?.Email || "Email Address"}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.email ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                  }`}
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Phone className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder={data?.PhoneNumber || "Phone Number"}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="pl-12 py-4 h-full bg-white border-[#d9d9d9] text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c]"
                />
              </div>

              {/* Inquiry About */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                  <Sun className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                  <span className="text-[#8c877c] text-sm">
                    {data?.InquiryAbout || "Inquiry About"}
                  </span>
                </div>
                <Select
                  value={formData.inquiry}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-full pl-36 h-full bg-white border-[#d9d9d9] text-[#140e02] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] flex items-center">
                    <SelectValue className="pb-0" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#d9d9d9]">
                    {data?.InquiryTypes?.map((type: string) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-[#140e02] focus:bg-[#ffbf3c]/10"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <div className="absolute left-4 top-4 z-10">
                <MessageCircle className="w-5 h-5 text-[#ffbf3c]" />
              </div>
              <Textarea
                name="message"
                placeholder={data?.Message || "Your Message"}
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className={`pl-12 py-4 bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] resize-vertical ${
                  errors.message ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                }`}
                required
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.message}
                </span>
              )}
            </div>
          </>
        )}

        {submitStatus === "success" && (
          <div className="text-[#072f6c] mt-2 text-center">
            Thank you for your message! We will get back to you soon.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="text-red-600 mt-2 text-center">
            Sorry, we couldn't send your message. Please try again or contact us
            directly.
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#ffbf3c] hover:bg-[#e6ac35] text-[#140e02] font-semibold px-12 py-4 h-auto focus-visible:ring-2 focus-visible:ring-[#ffbf3c] focus-visible:ring-offset-2"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  )
}
