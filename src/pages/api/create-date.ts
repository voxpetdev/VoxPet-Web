import type { APIRoute } from "astro"
import { getUserFromJWT } from "@/utils/getUserFromJWT"

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()
    const { date, consultation, place, observations, petID, status } = body
    const token = cookies.get("access_token")?.value
    const user = getUserFromJWT(token)
    const API_BASE_URL = import.meta.env.API_BASE_URL

    const appointment = {
        date, 
        consultation, 
        place, 
        observations, 
        petID,
        userID: user.userID, 
        status: "PENDING"
    }
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment)
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), { status: data.code })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
    }
}