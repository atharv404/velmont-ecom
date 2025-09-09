import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback_secret')

export interface JWTPayload {
  userId: string
  email: string
  isAdmin: boolean
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as JWTPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function getTokenFromRequest(request: NextRequest): Promise<string | null> {
  // Try to get token from cookie
  const token = request.cookies.get('token')?.value
  
  if (token) {
    return token
  }

  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  return null
}

export async function authenticateRequest(request: NextRequest): Promise<JWTPayload | null> {
  const token = await getTokenFromRequest(request)
  
  if (!token) {
    return null
  }

  return await verifyToken(token)
}