import User from '@/database/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { name, username, password } = reqBody;
    // Parses the request body to extract username, email, and password.
    console.log(reqBody);
    //Checks if a user with the provided email already exists.
    const user = await User.findOne({ username });

    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(hashedPassword);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    // Saves the new user to the database.
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 },
    );
  }
}
