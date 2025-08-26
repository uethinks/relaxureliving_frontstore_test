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
  
  export interface CraftsmanshipItem {
    id: number
    title: string
    description: string
    mediaPosition: string
    media: Media
  }
  
  export interface CraftsmanshipData {
    __component: string
    id: number
    title: string
    description: string
    description2?: string
    subtitle: string
    items: CraftsmanshipItem[]
  }
  