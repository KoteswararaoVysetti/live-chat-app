import { TokenPayload } from '@/types/token-payload';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: TokenPayload) => {
  //create token data
  // A JavaScript object (tokenData) is created to store essential user
  // information. In this case, it includes the user's unique identifier (id),
  // username, and username.

  const tokenData: JwtPayload = {
    id: payload.id,
    username: payload.username,
    name: payload.name,
  };

  // Create a token with expiration of 1 day
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: '1d',
  });

  return token;
};

export const getDataFromToken = (token: string) => {
  // Verify and decode the token using the secret key
  const decodedToken: JwtPayload | string = jwt.verify(
    token,
    process.env.TOKEN_SECRET!,
  );

  if (typeof decodedToken === 'string') {
    throw new Error('Invalid Token');
  }

  // Return the user ID from the decoded token
  return decodedToken as TokenPayload;
};
