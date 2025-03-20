'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { endpoints } from '@/lib/endpoints';
import { routes } from '@/lib/routes';
import { User } from '@/types/domain/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [isLoading, setLoading] = useTransition();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(
    () =>
      setLoading(async () => {
        try {
          const res = await axios.get(endpoints.user.all);
          setUsers(res.data);
          toast.success('Sucessfully fetched the user data');
        } catch (err) {
          console.error(err);
          toast.error('Error Fetching the User');
          router.replace(routes.login);
        }
      }),
    [toast],
  );
  return isLoading ? (
    <Skeleton className="w-full h-full" />
  ) : (
    <Table>
      <TableCaption>All Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}
