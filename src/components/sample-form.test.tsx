import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SampleForm from '@/components/sample-form';

describe('SampleForm Component', () => {
  it('renders correctly', () => {
    render(<SampleForm />);

    // Check that inputs and button are present
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  it('captures input values and handles form submission', async () => {
    render(<SampleForm />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByText('submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Assuming that submitting would make the inputs disabled
    await waitFor(() => expect(emailInput).toBeDisabled());
    await waitFor(() => expect(passwordInput).toBeDisabled());
  });

  it('shows validation errors', async () => {
    render(<SampleForm />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByText('submit');

    // Providing invalid values
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
      const errorMessages = screen.getAllByText('this field is required');
      return expect(errorMessages).toHaveLength(2);
    });
  });
});
