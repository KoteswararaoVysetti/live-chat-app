import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const handler = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value || '';
  if (!token) {
    redirect(routes.login);
  }
  redirect(routes.dashboard);
};

export { handler as GET, handler as POST };
