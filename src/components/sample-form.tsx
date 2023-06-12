import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

// Always use zod to validate your form
const SampleFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

// Infer TS type from zod schema
type SampleFormValues = z.infer<typeof SampleFormSchema>;

// Example form using react-hook-form and zod
const SampleForm = () => {
  const { t } = useTranslation('form');

  const [submitting, setSubmitting] = useState(false);

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormValues>({
    resolver: zodResolver(SampleFormSchema),
  });

  const onSubmit = (values: SampleFormValues) => {
    // Handle form submission
    console.log(values);
    setSubmitting(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-64 flex-col gap-6">
      {/* Use register to bind react-hook-form to field */}
      <input
        type="text"
        className="h-12 border-2 p-2 disabled:bg-gray-200"
        placeholder={t('email') ?? ''}
        disabled={submitting}
        {...register('email')}
      />
      {errors.email && (
        <span className="text-red-600">{t('this field is required')}</span>
      )}
      {/* Use register to bind react-hook-form to field */}
      <input
        type="password"
        className="h-12 border-2 p-2 disabled:bg-gray-200"
        placeholder={t('password') ?? ''}
        disabled={submitting}
        {...register('password')}
      />
      {errors.password && (
        <span className="text-red-600">{t('this field is required')}</span>
      )}
      <button
        type="submit"
        className="h-12 rounded-md bg-blue-400 font-medium text-white drop-shadow-sm disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={submitting}>
        {t('submit')}
      </button>
    </form>
  );
};

export default SampleForm;
