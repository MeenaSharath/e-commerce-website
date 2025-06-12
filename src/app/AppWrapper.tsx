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

        if (!res.ok) {
          throw new Error('Invalid response from server');
        }

        const data = await res.json();

        if (!data?.isAuthenticated) {
          router.replace('/signin');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        router.replace('/signin');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <span>Loading...</span>
      </div>
    );
  }

  return <ReduxProvider>{children}</ReduxProvider>;
}
