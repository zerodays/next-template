import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-64 flex-col gap-6">
      {/* Use register to bind react-hook-form to field */}
      <input
        type="text"
        className="h-12 border-2 p-2"
        placeholder="email"
        {...register('email')}
      />
      {errors.email && (
        <span className="text-red-600">This field is required</span>
      )}
      {/* Use register to bind react-hook-form to field */}
      <input
        type="password"
        className="h-12 border-2 p-2"
        placeholder="password"
        {...register('password')}
      />
      {errors.password && (
        <span className="text-red-600">This field is required</span>
      )}
      <button
        type="submit"
        className="h-12 rounded-md bg-blue-400 font-medium text-white drop-shadow-sm">
        Submit
      </button>
    </form>
  );
};

export default SampleForm;
