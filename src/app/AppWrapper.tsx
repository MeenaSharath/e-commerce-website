// app/AppWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReduxProvider } from './ReduxProvider';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://e-commerce-project-dashboard.onrender.com/check-auth', {
          credentials: 'include',
        });
        const data = await res.json();

        if (!data.isAuthenticated) {
          router.push('/signin');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/signin');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
