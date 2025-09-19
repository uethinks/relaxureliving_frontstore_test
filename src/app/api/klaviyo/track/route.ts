import { NextResponse } from 'next/server'
import axios from 'axios'

//用于conaactus 等前端表单
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiUrl = process.env.KLAVIYO_TRACK_API_URL || "https://a.klaviyo.com/api/events"
    const apiKey = process.env.KLAVIYO_PUBLIC_API_KEY


    if (!apiKey) {
      return NextResponse.json(
        { error: 'Klaviyo API key not configured' },
        { status: 500 }
      )
    }

    const response = await axios.post(apiUrl, body, {
        headers: {
          'Authorization': `Klaviyo-API-Key ${apiKey}`,    
          accept: 'application/vnd.api+json',
          revision: '2025-07-15',
          'content-type': 'application/vnd.api+json',
        }
      })

    console.log("Send kalvyio api success with body", body)

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Error in Klaviyo track API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send data to Klaviyo' },
      { status: error.response?.status || 500 }
    )
  }
} 