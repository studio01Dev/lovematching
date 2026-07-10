'use client';

import dynamic from 'next/dynamic';

const SentRequestDetail = dynamic(() => import('@/presentation/screen/match/sentRequestDetail'), {
  ssr: false,
});

export default function SentRequestDetailPage() {
  return <SentRequestDetail />;
}
