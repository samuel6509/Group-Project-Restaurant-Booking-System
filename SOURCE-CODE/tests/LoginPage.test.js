import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoginPage from '@/Pages/LoginPage';
import { useForm } from '@inertiajs/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

//Mocking Inertia's useForm hook
jest.mock('@inertiajs/react', () => ({
    useForm: jest.fn(),
}));

describe('LoginPage - Login Form', () => {
    beforeEach(() => {
        //Reset mock before each test
        useForm.mockReturnValue({
            data: { email: '', password: '', rememberMe: false },
            setData: jest.fn(),
            post: jest.fn(),
        });
    });

    test('Submitting the form triggers the login request', async () => {
        const mockPost = jest.fn();
        useForm.mockReturnValue({
            data: { email: 'test@example.com', password: 'password', rememberMe: false },
            setData: jest.fn(),
            post: mockPost,
        });

        render(<LoginPage loggedIn={false} errors={{}} success={''} />);
        
        //Get inputs
        const emailInput = screen.getByTestId('email-input');
        const passInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', {name: /login/i});

        //Fill inputs
        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passInput, 'password');

        //Simulate clicking login button
        await userEvent.click(loginButton);

        //Wait for the post function to be called with the correct data
        await waitFor(() =>
            expect(mockPost).toHaveBeenCalledWith('/loginUser', {
                email: 'test@example.com',
                password: 'password',
                rememberMe: false,
            })
        );
    });

    test('Form cannot be submitted with empty fields', async () => {
        const mockPost = jest.fn();
        useForm.mockReturnValue({
            data: { email: '', password: '', rememberMe: false },
            setData: jest.fn(),
            post: mockPost,
        });

        render(<LoginPage loggedIn={false} errors={{}} success={''} />);

        //Get Inputs
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        //Simulate clicking login button
        await userEvent.click(loginButton);

        //Wait for validation (HTML5 default browser validations)
        await waitFor(() => {
            expect(emailInput).toBeInvalid();
            expect(passwordInput).toBeInvalid();
        });

        //Ensure the post function was not called since the form was not submitted
        await waitFor(() => expect(mockPost).not.toHaveBeenCalled());
    });
});
