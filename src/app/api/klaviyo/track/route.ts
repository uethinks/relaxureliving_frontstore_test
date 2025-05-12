import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiUrl = process.env.KLAVIYO_TRACK_API_URL || "https://a.klaviyo.com/api/track"
    const apiKey = process.env.KLAVIYO_PUBLIC_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Klaviyo API key not configured' },
        { status: 500 }
      )
    }

    const response = await axios.post(apiUrl, {
      token: apiKey,
      ...body
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Error in Klaviyo track API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send data to Klaviyo' },
      { status: error.response?.status || 500 }
    )
  }
} 