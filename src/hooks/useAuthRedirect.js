'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useAuthRedirect = () => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/signin');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  return checkingAuth;
};
