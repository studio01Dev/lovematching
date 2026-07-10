'use client';

import dynamic from 'next/dynamic';

const ViewRequest = dynamic(() => import('@/presentation/screen/match/viewRequest'), {
  ssr: false,
});

export default function ViewRequestPage() {
  return <ViewRequest />;
}
