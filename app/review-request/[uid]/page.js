'use client';

import dynamic from 'next/dynamic';

const ReviewRequest = dynamic(() => import('@/presentation/screen/match/reviewRequest'), {
  ssr: false,
});

export default function ReviewRequestPage() {
  return <ReviewRequest />;
}
