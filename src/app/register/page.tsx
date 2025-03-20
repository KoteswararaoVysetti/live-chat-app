'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios, { HttpStatusCode } from 'axios';
import { routes } from '@/lib/routes';
import { endpoints } from '@/lib/endpoints';

export default function Page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: '',
    username: '',
    password: '',
  });

  const onRegister = async () => {
    try {
      const response = await axios.post(endpoints.register, user);
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Unable to Create the User Account');
      }
      router.push(routes.login);
    } catch (error) {
      console.error('Signup failed', (error as Error).message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="username"
        />
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
        <button onClick={onRegister}>Sign Up</button>

        <Link href={routes.login}>Visit login page</Link>
      </div>
    </div>
  );
}
