import '@/presentation/asset/App.css';
import AppShell from './AppShell';

export const metadata = {
  title: '러브매칭',
  description: '러브매칭 신청하기',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=390, initial-scale=1, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
