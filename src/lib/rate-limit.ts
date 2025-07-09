import { NextResponse } from 'next/server'

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute

export async function isRateLimited(ip: string): Promise<boolean> {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

export function getRateLimitHeaders(ip: string) {
  const record = rateLimitMap.get(ip)
  if (!record) return {}

  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count)
  const resetTime = new Date(record.resetTime).toISOString()

  return {
    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': resetTime,
    'Retry-After': Math.ceil((record.resetTime - Date.now()) / 1000).toString()
  }
} 