'use client';

import dynamic from 'next/dynamic';

const Queue = dynamic(() => import('@/presentation/screen/match/queue'), {
  ssr: false,
});

export default function QueuePage() {
  return <Queue />;
}
