import { Inter } from 'next/font/google';

import SampleForm from '@/components/sample-form';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <main
      className={`flex h-screen flex-col items-center justify-center gap-8 text-center ${inter.className}`}>
      <h1 className="text-4xl font-bold">
        Next.js + Tailwind CSS + TypeScript
      </h1>
      <h2 className="text-lg font-bold text-gray-500">
        with i18n, jest, zod, react-hook-form
      </h2>
      <SampleForm />
    </main>
  );
}
