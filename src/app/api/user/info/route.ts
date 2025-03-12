import User from '@/database/models/user';
import dbConnect from '@/lib/mongodb';
import { getDataFromToken } from '@/lib/token-helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Extract user ID from the authentication token
    const userId = await getDataFromToken(request);

    // Find the user in the database based on the user ID
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
