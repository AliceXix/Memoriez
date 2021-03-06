import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//import { handleRegister } from './handlers/handleRegister';

beforeAll(() => jest.spyOn(window, 'fetch'))

test('renders form', () => {
  render(<App />);
  const formElm = screen.getByText(/Username/i);
  expect(formElm).toBeInTheDocument();
});

test('clicking "register" registers new user', async () => {
  
  render(<App />);

  let mockFetch : any = window.fetch;
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({success: true}),
  })

  userEvent.click(screen.getByRole('button', {name: /register/i}))

  expect(window.fetch).toHaveBeenCalledWith(
    '/register',
    expect.objectContaining({
      method: 'POST',
      //body: JSON.stringify(registerUser),
    }),
  )

  // fetch('/register', {method : 'POST', body: })
  
  expect(window.fetch).toHaveBeenCalledTimes(1)
  //expect(await screen.findByText(/registered/i)).toBeInTheDocument()
})