'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios, { HttpStatusCode } from 'axios';
import { routes } from '@/lib/routes';
import { endpoints } from '@/lib/endpoints';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(endpoints.user.login, user);
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Unable to Login');
      }
      router.push(routes._);
    } catch (error) {
      console.log('Login failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onLogin}>Login</button>
      <div>
        Not a member?
        <Link href={routes.register}>click here to register.</Link>
      </div>
    </div>
  );
}
