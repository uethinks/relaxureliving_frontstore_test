// app/api/hello/route.js
import { revalidateTag } from "next/cache"

export async function GET(req) {
  try {
    // Revalidate using the imported function
    revalidateTag("regions")

    return new Response(JSON.stringify({ message: "regions cache cleared" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to revalidate" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
