'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Home from '@/components/Home';
import ProtectedRoute from '@/components/ProtectedRoute';


export default function HomePage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');

    console.log('Cookie check: isLoggedIn =', isLoggedIn);

    if (!isLoggedIn) {
      router.replace('/signin'); // replace to avoid back button going to protected route
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return <div className="text-center mt-20 text-lg">Checking authentication...</div>;
  }

  return( <ProtectedRoute>
     <Home />
  </ProtectedRoute>);
}
