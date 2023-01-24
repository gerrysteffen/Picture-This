import { render, screen } from '@testing-library/react';
import AppType from './AppType';

test('renders learn react link', () => {
  render(<AppType />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
