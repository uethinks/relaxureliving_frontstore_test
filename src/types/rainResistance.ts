export interface MediaFormat {
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
  
  export interface Media {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      small?: MediaFormat
      xsmall?: MediaFormat
      thumbnail?: MediaFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  
  export interface RainResistanceItem {
    id: number
    title: string
    description: string
    mediaPosition: "Left" | "Right"
    media: Media
    button: any
    rightButton?: any
    backgroundColor?: string
  }
  
  export interface RainResistanceBlock {
    __component: string
    id: number
    title: string
    description?: string
    items: RainResistanceItem[]
    backgroundColor?: string
  }
  