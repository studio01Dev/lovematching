'use client';

import dynamic from 'next/dynamic';

const InputCode = dynamic(() => import('@/presentation/screen/match/inputCode'), {
  ssr: false,
});

export default function InputCodePage() {
  return <InputCode />;
}
