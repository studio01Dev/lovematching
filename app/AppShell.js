'use client';

import Header from '@/presentation/component/header/header';
import { FormTestProvider } from '@/presentation/context/FormTestContext';

export default function AppShell({ children }) {
  return (
    <FormTestProvider>
    <div>
      <Header />
      <div style={{ width: '390px', margin: '0 auto' }}>{children}</div>
      <div style={{ height: '100px' }}></div>
    </div>
    </FormTestProvider>
  );
}
