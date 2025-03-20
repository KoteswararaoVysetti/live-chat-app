'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Skeleton } from '../ui/skeleton';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="size-4">
        <Skeleton />
      </div>
    );

  if (resolvedTheme === 'dark') {
    return <SunIcon onClick={() => setTheme('light')} />;
  }

  if (resolvedTheme === 'light') {
    return <MoonIcon onClick={() => setTheme('dark')} />;
  }
}
