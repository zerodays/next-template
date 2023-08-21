import { render, screen } from '@testing-library/react';
import Home from '@/pages';

import '@testing-library/jest-dom';

jest.mock('@/i18n/inject-translations', () => {
  return {
    __esModule: true,
    injectSsrTranslations: () => () => null,
  };
});

jest.mock('@/components/sample-form', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mockSampleForm">Mocked Form</div>,
  };
});

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />);

    // Check for dynamic fonts and styles
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(
      'flex h-screen items-center justify-center text-center',
    );

    // Check for the rendered texts
    expect(
      screen.getByText('Next.js + Tailwind CSS + TypeScript'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('with i18n, jest, zod, react-hook-form'),
    ).toBeInTheDocument();

    // Check if the SampleForm component is rendered
    expect(screen.getByTestId('mockSampleForm')).toBeInTheDocument();
  });
});
