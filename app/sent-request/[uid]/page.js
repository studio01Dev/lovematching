'use client';

import dynamic from 'next/dynamic';

const SentRequest = dynamic(() => import('@/presentation/screen/match/sentRequest'), {
  ssr: false,
});

export default function SentRequestPage() {
  return <SentRequest />;
}
