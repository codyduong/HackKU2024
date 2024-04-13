'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import { SessionProvider } from 'next-auth/react';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <SessionProvider>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {children}
      </APIProvider>
    </SessionProvider>
  );
}
