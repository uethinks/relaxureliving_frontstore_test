export interface ButtonData {
  id: number
  type: "Primary" | "Secondary" | "Outline"
  size: "Small" | "Medium" | "Large"
  sizeMobile: "Small" | "Medium" | "Large"
  text: string
  link: string
  icon?: string | null
}

export interface ImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface BackgroundImage {
  id: number
  documentId: string
  formats: {
    large: ImageFormat
    medium: ImageFormat
    small: ImageFormat
    xsmall: ImageFormat
    thumbnail: ImageFormat
  }
  url: string
}

export interface V2HeroBannerData {
  __component: string
  id: number
  title: string
  description: string
  button: ButtonData
  backgroundImage: BackgroundImage
}
