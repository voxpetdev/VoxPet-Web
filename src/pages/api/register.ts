import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
    const { name, last_name, email, phone, password } = await request.json()

    const API_BASE_URL = import.meta.env.API_BASE_URL
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, last_name, email, phone, password })
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), { status: data.code })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
    }
}