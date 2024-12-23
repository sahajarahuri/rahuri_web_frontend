import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
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
  const sessions = await db.collection('sessions').find({}).toArray()
  return NextResponse.json(sessions)
}

export async function POST(request) {
  const user = await verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  const result = await db.collection('sessions').insertOne(data)
  return NextResponse.json({ id: result.insertedId })
}

export async function PUT(request) {
  const user = await verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  await db.collection('sessions').updateOne({ _id: new ObjectId(id) }, { $set: data })
  return NextResponse.json({ success: true })
}

export async function DELETE(request) {
  const user = await verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.json()
  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  await db.collection('sessions').deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ success: true })
}

