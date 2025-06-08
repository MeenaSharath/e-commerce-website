'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Home from '@/components/Home';

export default function HomePage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');

    if (!isLoggedIn) {
      router.push('/signin');
    } else {
      setCheckingAuth(false); // Only render Home after auth verified
    }
  }, [router]);

  if (checkingAuth) {
    return <div className="text-center mt-20 text-lg">Checking authentication...</div>;
  }

  return <Home />;
}
