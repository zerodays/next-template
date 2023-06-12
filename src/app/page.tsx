import useTranslation from 'next-translate/useTranslation';

import SampleForm from '@/components/sample-form';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <main className="flex h-screen items-center justify-center text-center">
      <SampleForm />
      <div>{t('title')}</div>
    </main>
  );
}
