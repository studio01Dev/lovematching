'use client';

import dynamic from 'next/dynamic';

const MakeRequest = dynamic(() => import('@/presentation/screen/match/makeRequest'), {
  ssr: false,
});

export default function MakeRequestPage() {
  return <MakeRequest />;
}
