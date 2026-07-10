'use client';

import dynamic from 'next/dynamic';

const ApproveRequest = dynamic(() => import('@/presentation/screen/match/approveRequest'), {
  ssr: false,
});

export default function ApproveRequestPage() {
  return <ApproveRequest />;
}
