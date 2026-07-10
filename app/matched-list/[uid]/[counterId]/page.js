'use client';

import dynamic from 'next/dynamic';

const MatchedListDetail = dynamic(() => import('@/presentation/screen/match/matchedListDetail'), {
  ssr: false,
});

export default function MatchedListDetailPage() {
  return <MatchedListDetail />;
}
