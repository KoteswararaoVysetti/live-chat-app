'use client';

import { routes } from '@/lib/routes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/user/info');
      setData(res.data.data.name);
    } catch (err) {
      console.error(err);
      router.replace(routes.login);
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <h2>{data === 'nothing' ? 'Nothing' : data}</h2>
      <button onClick={getUserDetails}>Details</button>
    </div>
  );
}
