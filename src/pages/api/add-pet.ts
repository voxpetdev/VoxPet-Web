import type { APIRoute } from "astro"
import { getUserFromJWT } from "@/utils/getUserFromJWT"

export const POST: APIRoute = async ({ request, cookies }) => {
    const data = await request.json()
    const API_BASE_URL = import.meta.env.API_BASE_URL
    const token = cookies.get("access_token")?.value
    const userID = getUserFromJWT(token).userID
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/pets/${userID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await res.json()

        return new Response(JSON.stringify(result), { status: result.code })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
    }
}