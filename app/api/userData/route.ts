import { NextResponse } from 'next/server'
import userData from '@/data.json'

export async function GET() {
  return NextResponse.json(userData)
}
