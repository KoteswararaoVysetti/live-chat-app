import User from '@/database/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { TokenPayload } from '@/types/token-payload';
import { generateToken } from '@/lib/token-helpers';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { username, password } = reqBody;
    console.log(reqBody);
    //check if user exists
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 },
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invlid password' }, { status: 400 });
    }

    //create token data
    // A JavaScript object (tokenData) is created to store essential user
    // information. In this case, it includes the user's unique identifier (id),
    // username, and username.

    const tokenData: TokenPayload = {
      id: user._id,
      username: user.username,
      name: user.name,
    };

    // Create a token with expiration of 1 day
    const token = generateToken(tokenData);

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
