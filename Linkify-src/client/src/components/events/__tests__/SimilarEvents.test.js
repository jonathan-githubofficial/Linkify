import { jsx } from '@emotion/react';
// import { jsx } from '@emotion/react/jsx-runtime';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SimilarEvents from '../SimilarEvents';

describe('SimilarEvents component', () => {
  test('renders events view correctly', () => {
 

    render(<SimilarEvents />, { jsx });

    const listSection = screen.getByText('listSection.view');
    expect(listSection).toBeInTheDocument();

  });
});
