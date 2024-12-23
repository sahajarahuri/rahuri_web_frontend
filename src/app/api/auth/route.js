import { NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

export async function POST(request) {
  const { email, password } = await request.json()

  const client = await clientPromise
  const db = client.db('sahaja_yoga')
  const user = await db.collection('users').findOne({ email })

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

  return NextResponse.json({ token })
}

