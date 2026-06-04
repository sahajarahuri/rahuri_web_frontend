import { NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'
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

  const token = await new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  return NextResponse.json({ token })
}

