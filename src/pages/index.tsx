import { Inter } from 'next/font/google';

import SampleForm from '@/components/sample-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex h-screen items-center justify-center text-center ${inter.className}`}>
      <SampleForm />
    </main>
  );
}
