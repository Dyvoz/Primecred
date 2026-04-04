import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok', site: process.env.NEXT_PUBLIC_primecred })
}
