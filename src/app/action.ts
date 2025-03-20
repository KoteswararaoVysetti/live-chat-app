import { getDataFromToken } from '@/lib/token-helpers';
import { cookies } from 'next/headers';

export async function getUserDetails() {
  // Retrieve the token from the cookies
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  if (!token) {
    return undefined;
  }
  return getDataFromToken(token);
}
