import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

   
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password!' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}