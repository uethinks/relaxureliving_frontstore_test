export interface FAQData {
  id: number
  Title: string
  Subtitle: string
  homepageFAQ: FAQCategory[]
}

export interface FAQCategory {
  id: number
  Title: string
  question_and_answer: FAQAnswer[]
}

export interface FAQAnswer {
  id: number
  question: string
  Answer: string
}

export interface ContactUsProps {
  id: number
  DescriptionOnImage: string
  Email: string
  FormDescription: string
  FullName: string
  Image: {
    data: {
      attributes: {
        url: string
      }
    }
  } | null
  Message: string
  PhoneNumber: string
  SendButton: string
} 