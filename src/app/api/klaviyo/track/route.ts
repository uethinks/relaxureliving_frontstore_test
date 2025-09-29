import { NextResponse } from 'next/server'
import axios from 'axios'

//用于conaactus 等前端表单
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiBase = "https://a.klaviyo.com"
    const apiKey = process.env.KLAVIYO_PUBLIC_API_KEY


    if (!apiKey) {
      return NextResponse.json(
        { error: 'Klaviyo API key not configured' },
        { status: 500 }
      )
    }
    

    let apiEndPoint = body.apiEndPoint || ""
    delete body.apiEndPoint
    let fullURL = `${apiBase}${apiEndPoint}`

    let header = {
          'Authorization': `Klaviyo-API-Key ${apiKey}`,    
          accept: 'application/vnd.api+json',
          revision: '2025-07-15',
          'content-type': 'application/vnd.api+json',
        }

    console.log("[Klaviyo] Sending data to Klaviyo with body: ", JSON.stringify(body), "header", JSON.stringify(header), "fullURL", fullURL)

    const response = await axios.post(fullURL, body, {
        headers: header
      })

    console.log("[Klaviyo] Send kalvyio api success with body", body)

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('[Klaviyo] Error in Klaviyo track API:', error.message)
    console.error('[Klaviyo] Error in Klaviyo track API:', error.response?.data)
    return NextResponse.json(
      { error: error.message || 'Failed to send data to Klaviyo' },
      { status: error.response?.status || 500 }
    )
  }
} 