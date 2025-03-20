import UserModel from '@/database/models/user-model';
import dbConnect from '@/lib/mongodb';
import { getDataFromToken } from '@/lib/token-helpers';
import { User } from '@/types/domain/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Extract user ID from the authentication token

    // Retrieve the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    const userPayload = getDataFromToken(token);
    if (!userPayload?.id) {
      throw new Error('Invalid Token');
    }

    // Find the user in the database based on the user ID
    const users = await UserModel.find<User[]>({ isDeleted: false }).select(
      '-password',
    );
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
