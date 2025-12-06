import jwt from 'jsonwebtoken'

export function getUserFromJWT(token) {
    if (!token) return null

    try {
        return jwt.verify(token, import.meta.env.SECRET_KEY)
    } catch (error) {
        console.error(error)
    }
}