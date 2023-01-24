import { render, screen } from '@testing-library/react';
import App from './App';

test('needs authentication', () => {
  const app = render(<App />);
  const login = app.findByTestId('login');
  expect(app).toContain(login)
});
