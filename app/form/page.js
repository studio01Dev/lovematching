'use client';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('@/presentation/screen/forms/form'), {
  ssr: false,
});

export default function FormPage() {
  return <Form />;
}
