'use client';

import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import Home from '@/components/Home';

export default function HomePage() {
  const checkingAuth = useAuthRedirect();

  if (checkingAuth) {
    return <div className="text-center mt-20 text-lg">Checking authentication...</div>;
  }

  return <Home />;
}
