'use client';

import Header from '@/presentation/component/header/header';

export default function AppShell({ children }) {
  return (
    <div>
      <Header />
      <div style={{ width: '390px', margin: '0 auto' }}>{children}</div>
      <div style={{ height: '100px' }}></div>
    </div>
  );
}
