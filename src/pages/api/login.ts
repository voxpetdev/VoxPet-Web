import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
    const { username, password } = await request.json()

    const API_BASE_URL = import.meta.env.API_BASE_URL
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        const { access_token } = data

        cookies.set('access_token', access_token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60
        })

        return new Response(JSON.stringify(data), { status: data.code })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
    }
}