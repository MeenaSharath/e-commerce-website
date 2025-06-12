'use client';

import React from 'react';
import { ReduxProvider } from './ReduxProvider';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}