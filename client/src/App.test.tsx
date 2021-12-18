import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form', () => {
  render(<App />);
  const formElm = screen.getByText(/Username/i);
  expect(formElm).toBeInTheDocument();
});