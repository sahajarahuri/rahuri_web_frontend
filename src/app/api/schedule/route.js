  import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { jwtVerify } from 'jose'

async function verifyToken(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1]
  if (!token) {
    return null
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    return null
  }
}

export async function GET() {
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  const schedule = await db.collection('schedule').findOne({})
  return NextResponse.json(schedule || {})
}

export async function PUT(request) {
  const user = await verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  await db.collection('schedule').updateOne({}, { $set: data }, { upsert: true })
  return NextResponse.json({ success: true })
}
