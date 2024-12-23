import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verify } from 'jsonwebtoken'

async function verifyToken(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1]
  if (!token) {
    return null
  }
  try {
    return verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function GET() {
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  const content = await db.collection('content').findOne({})
  return NextResponse.json(content || {})
}

export async function PUT(request) {
  const user = await verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  await db.collection('content').updateOne({}, { $set: data }, { upsert: true })
  return NextResponse.json({ success: true })
}

