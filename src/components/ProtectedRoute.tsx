'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/check-auth`, {
          credentials: 'include',
        });

        const data = await res.json();

        if (!data?.isAuthenticated) {
          router.replace('/signin');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/signin');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return <>{children}</>;
}