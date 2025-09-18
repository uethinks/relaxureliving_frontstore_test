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
import { submitBecomeDealer } from "@lib/cms/strapiCmsApi"
import {
  House,
  LocateFixed,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { countryList } from "./country"
import { MultiSelect } from "./ui/multi-select"

// 定义常量以避免重复的字符串字面量
const BORDER_ERROR_CLASS = "border-red-500"
const BORDER_DEFAULT_CLASS = "border-[#d9d9d9]"

interface FormData {
  fullName: string
  phoneNumber: string
  email: string
  companyName: string
  businessAddress: string
  streetAddress: string
  city: string
  stateProvinceRegion: string
  zipPostalCode: string
  country: string
  source: string
  intention: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phoneNumber?: string
  companyName?: string
  businessAddress?: string
  streetAddress?: string
  city?: string
  stateProvinceRegion?: string
  zipPostalCode?: string
  country?: string
  source?: string
  intention?: string
}

const sourceOptions = [
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "Youtube", label: "Youtube" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Search Engines", label: "Search Engines" },
  { value: "Referral", label: "Referral" },
  { value: "E-mail", label: "E-mail" },
  { value: "Others", label: "Others" },
]

const intentionOptions = [
  {
    value: "Relaxure Corsica Collection",
    label: "Relaxure Corsica Collection",
  },
  { value: "Relaxure Capri Collection", label: "Relaxure Capri Collection" },
]

export const V2BecomeDealerForm = (): React.JSX.Element => {
  const [sourceValues, setSourceValues] = useState<string[]>([])
  const [intentionValues, setIntentionValues] = useState<string[]>([])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      source: sourceValues ? sourceValues.join(",") : "",
    }))
  }, [sourceValues])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      intention: intentionValues ? intentionValues.join(",") : "",
    }))
  }, [intentionValues])

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    businessAddress: "",
    streetAddress: "",
    city: "",
    stateProvinceRegion: "",
    zipPostalCode: "",
    country: "",
    source: "",
    intention: "",
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

    // Validate company name
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required"
    }

    if (!formData.source.trim()) {
      newErrors.source = "required"
    }
    if (!formData.intention.trim()) {
      newErrors.intention = "required"
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

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }))
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
      await submitBecomeDealer(formData)
      setSubmitStatus("success")
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        companyName: "",
        businessAddress: "",
        streetAddress: "",
        city: "",
        stateProvinceRegion: "",
        zipPostalCode: "",
        country: "",
        source: "",
        intention: "",
      })
      setSourceValues([])
      setIntentionValues([])
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
          Become a Dealer
        </h1>
        <p className="text-[#8c877c] text-base mx-auto">
          Fill in the information below and one of our representatives will be
          in touch shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {
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
                  placeholder={"Full name (Required)"}
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
                  placeholder={"Email (Required)"}
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
                  placeholder={"Phone number (Required)"}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.phoneNumber
                      ? BORDER_ERROR_CLASS
                      : BORDER_DEFAULT_CLASS
                  }`}
                  required
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>

              {/* Company Name */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <House className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="text"
                  name="companyName"
                  placeholder={"Company Name (Required)"}
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.companyName
                      ? BORDER_ERROR_CLASS
                      : BORDER_DEFAULT_CLASS
                  }`}
                  required
                />
                {errors.companyName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </span>
                )}
              </div>
            </div>

            {/* Business Address */}
            <div className="relative h-[48px]">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
              </div>
              <Input
                type="text"
                name="businessAddress"
                placeholder={"Business Address (Required)"}
                value={formData.businessAddress}
                onChange={handleInputChange}
                className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                  errors.businessAddress
                    ? BORDER_ERROR_CLASS
                    : BORDER_DEFAULT_CLASS
                }`}
                required
              />
              {errors.businessAddress && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.businessAddress}
                </span>
              )}
            </div>

            {/* Street Address */}
            <div className="relative h-[48px]">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
              </div>
              <Input
                type="text"
                name="streetAddress"
                placeholder={"Street Address"}
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                  errors.streetAddress
                    ? BORDER_ERROR_CLASS
                    : BORDER_DEFAULT_CLASS
                }`}
              />
              {errors.streetAddress && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.streetAddress}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* City */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="text"
                  name="city"
                  placeholder={"City"}
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.city ? BORDER_ERROR_CLASS : BORDER_DEFAULT_CLASS
                  }`}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* State / Province / Region */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="text"
                  name="stateProvinceRegion"
                  placeholder={"State / Province / Region"}
                  value={formData.stateProvinceRegion}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.stateProvinceRegion
                      ? BORDER_ERROR_CLASS
                      : BORDER_DEFAULT_CLASS
                  }`}
                />
                {errors.stateProvinceRegion && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.stateProvinceRegion}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ZIP / Postal Code */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <Input
                  type="text"
                  name="zipPostalCode"
                  placeholder={"ZIP / Postal Code"}
                  value={formData.zipPostalCode}
                  onChange={handleInputChange}
                  className={`pl-12 py-4 h-full bg-white text-[#140e02] placeholder-[#8c877c] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] ${
                    errors.zipPostalCode
                      ? BORDER_ERROR_CLASS
                      : BORDER_DEFAULT_CLASS
                  }`}
                />
                {errors.zipPostalCode && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.zipPostalCode}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="relative h-[48px]">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                  <LocateFixed className="w-5 h-5 text-[#ffbf3c]" />
                </div>
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                  <span className="text-[#8c877c] text-sm">Country</span>
                </div>
                <Select
                  value={formData.country}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger className="w-full pl-36 h-full bg-white border-[#d9d9d9] text-[#140e02] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c] flex items-center">
                    <SelectValue className="pb-0" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#d9d9d9]">
                    {countryList.map((val) => (
                      <SelectItem
                        key={val}
                        value={val}
                        className="text-[#140e02] focus:bg-[#ffbf3c]/10"
                      >
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* How did you hear about us? (Required) */}
            <div className="relative h-[48px]">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <MessageCircle className="w-5 h-5 text-[#ffbf3c]" />
              </div>
              <MultiSelect
                className={
                  "pl-12 h-full bg-white rounded-none border-[#d9d9d9] text-[#140e02] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c]"
                }
                placeholder={"How did you hear about us? (Required)"}
                options={sourceOptions}
                onValueChange={setSourceValues}
                defaultValue={sourceValues}
              />
              {errors.source && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.source}
                </span>
              )}
            </div>

            {/* What Products Are You Interested In?  (Required) */}
            <div className="relative h-[48px]">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <MessageCircle className="w-5 h-5 text-[#ffbf3c]" />
              </div>
              <MultiSelect
                className={
                  "pl-12 h-full bg-white rounded-none border-[#d9d9d9] text-[#140e02] focus-visible:border-[#ffbf3c] focus-visible:ring-[#ffbf3c]"
                }
                placeholder={"What Products Are You Interested In?  (Required)"}
                options={intentionOptions}
                onValueChange={setIntentionValues}
                defaultValue={intentionValues}
              />
              {errors.intention && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.intention}
                </span>
              )}
            </div>
          </>
        }

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
