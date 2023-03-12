import {render, screen, cleanup} from '@testing-library/react'


import Login from '../pages/auth/Login';

// describe(Login, () => {
//     if("Login page shows correct fields", () => {
//         const {getByTestId, getByRole, gettext} = render(<Login />);
//         const loginBtn = getByRole("")
//     });
// });

test('should render login page', () => { 
    render(<Login />);
    const loginTitle = screen.getByTestId('login-title');
    expect(loginTitle).toBeInTheDocument();
 })

