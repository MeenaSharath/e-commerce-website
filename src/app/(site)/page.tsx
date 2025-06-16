'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '@/redux/store';
import Home from '@/components/Home';


export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return <Home />;
}
