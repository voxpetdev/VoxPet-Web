import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
    cookies.delete("access_token", {
        path: "/"
    })

    return new Response(JSON.stringify({ ok: true }))
}