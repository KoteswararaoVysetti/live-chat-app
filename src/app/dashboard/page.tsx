'use client';

import Container from '@/components/common/container';
import ThemeSwitch from '@/components/common/theme-switch';
import { routes } from '@/lib/routes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/user/info');
      setData(res.data.data.name);
      toast.success('Sucessfully fetched the user data');
    } catch (err) {
      console.error(err);
      toast.error('Error Fetching the User');
      router.replace(routes.login);
    }
  };
  return (
    <Container>
      <ThemeSwitch />
      <h1>Profile</h1>
      <h2>{data === 'nothing' ? 'Nothing' : data}</h2>
      <button onClick={getUserDetails}>Details</button>
    </Container>
  );
}
