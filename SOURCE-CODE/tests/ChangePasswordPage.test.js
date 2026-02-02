import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ChangePasswordPage from '@/Pages/ChangePasswordPage';
import { useForm } from '@inertiajs/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

//Mocking Inertia's useForm hook
jest.mock('@inertiajs/react', () => ({
    useForm: jest.fn(),
}));

describe('ChangePasswordPage', () => {
    beforeEach(() => {
        //Reset mock before each test
        useForm.mockReturnValue({
            data: {
                currentPassword: '',
                newPassword: '',
                newPassword_confirmation: '',
            },
            setData: jest.fn(),
            put: jest.fn(),
            errors: {},
        });     
    });

    test('Fill out the register form and triggers register request', async () => {
        const mockPut = jest.fn();
        useForm.mockReturnValue({
            data: {
                currentPassword: 'OldPassword123!',
                newPassword: 'NewPassword123!',
                newPassword_confirmation: 'NewPassword123!',
            },
            setData: jest.fn(),
            put: mockPut,
            errors: {},
        });

        render(<ChangePasswordPage/>);

        //Get inputs
        const currentPassInput = screen.getByLabelText(/current password/i);
        const newPassInput = screen.getByTestId('new-pass-input');
        const confirmPassInput = screen.getByLabelText(/confirm new password/i);
        const submitButton = screen.getByRole('button', {name: /register/i});

        //Fill out the form
        await userEvent.type(currentPassInput, 'OldPassword123');
        await userEvent.type(newPassInput, 'NewPassword123');
        await userEvent.type(confirmPassInput, 'NewPassword123');

        //Check input for correct values
        expect(currentPassInput).toHaveValue('OldPassword123!');
        expect(newPassInput).toHaveValue('NewPassword123!');
        expect(confirmPassInput).toHaveValue('NewPassword123!');

        //Simulate clicking register button
        await userEvent.click(submitButton);

        // Wait for the put function to be called with the correct data
        await waitFor(() => {
            expect(mockPut).toHaveBeenCalledWith('/password/change', {
                currentPassword: 'OldPassword123!',
                newPassword: 'NewPassword123!',
                newPassword_confirmation: 'NewPassword123!',
            });
        });
    });

    test('Form cannot change password with empty fields', async () => {
        const mockPut = jest.fn();
        useForm.mockReturnValue({
            data: {
                currentPassword: '',
                newPassword: '',
                newPassword_confirmation: '',
            },
            setData: jest.fn(),
            put: mockPut,
            errors: {},
        });

        render(<ChangePasswordPage/>);

        //Get inputs
        const currentPassInput = screen.getByLabelText(/current password/i);
        const newPassInput = screen.getByTestId('new-pass-input');
        const confirmPassInput = screen.getByLabelText(/confirm new password/i);
        const submitButton = screen.getByRole('button', {name: /register/i});

        //Simulate clicking register button
        await userEvent.click(submitButton);

        //Wait for validation (HTML5 default browser validations)
        await waitFor(() => {
            expect(currentPassInput).toBeInvalid();
            expect(newPassInput).toBeInvalid();
            expect(confirmPassInput).toBeInvalid();
        });

        //Ensure the post function was not called since the form was not submitted
        await waitFor(() => expect(mockPut).not.toHaveBeenCalled());
    });
});