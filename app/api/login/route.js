import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

   
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password!' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}