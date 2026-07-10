'use client';

import dynamic from 'next/dynamic';

const MatchedList = dynamic(() => import('@/presentation/screen/match/matchedList'), {
  ssr: false,
});

export default function MatchedListPage() {
  return <MatchedList />;
}
