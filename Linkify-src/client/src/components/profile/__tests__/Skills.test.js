import { jsx } from '@emotion/react';
// import { jsx } from '@emotion/react/jsx-runtime';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import SkillsModal from '../modal/Skills';

describe('Skills component', () => {
  test('renders skills correctly', () => {
    const props = {
      id: '123',
      skills: ['skill1', 'skill2', 'skill3'],
      isOwner: true,
      getUser: jest.fn(),
    };
    
    const propsModal = {
      id: '123',
      skills: ['skill1', 'skill2', 'skill3'],
      getUser: jest.fn(),
    };

    render(<Skills {...props} />, { jsx });
    render(<SkillsModal {...propsModal} />, { jsx });

    const title = screen.getByText('userProfile.skills.title');
    expect(title).toBeInTheDocument();

    const skillItems = screen.getAllByRole('list-skills');
    expect(skillItems).toHaveLength(1);

    const skillModalItems = screen.getAllByRole('list-skills-modal');
    expect(skillModalItems).toHaveLength(2);

  });
});
