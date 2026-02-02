import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RegisterPage from '@/Pages/RegisterPage';
import { useForm } from '@inertiajs/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

//Mocking Inertia's useForm hook
jest.mock('@inertiajs/react', () => ({
    useForm: jest.fn(),
}));

describe('RegisterPage - Register Form', () => {
  beforeEach(() => {
          //Reset mock before each test
          useForm.mockReturnValue({
              data: { 
                firstName: '',
                lastName: '',
                email:'',
                password: '',
                confirmPassword: '',
                phoneNumber: '',
                allergies: 'no',
                allergyInfo: '' 
              },
              setData: jest.fn(),
              post: jest.fn(),
              errors: {},
          });
      });

      test('Fill out the register form and triggers register request', async () => {
        const mockPost = jest.fn();
        useForm.mockReturnValue({
          data: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.co.uk',
              password: 'Password123!',
              confirmPassword: 'Password123!',
              phoneNumber: '07512345678',
              allergies: 'no',
          },
          setData: jest.fn(),
          post: mockPost,
          errors: {},
        });

        render(<RegisterPage/>);

        //Get inputs
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByTestId('email-input');
        const passInput = screen.getByTestId('password-input');
        const confirmPassInput = screen.getByTestId('confirm-password-input');
        const phoneInput = screen.getByLabelText(/phone number/i);
        const allergyInput = screen.getByRole('combobox', {name: /do you have allergies/i});
        const registerButton = screen.getByRole('button', {name: /register/i});

        //Fill out the form
        await userEvent.type(firstNameInput, 'John');
        await userEvent.type(lastNameInput, 'Doe');
        await userEvent.type(emailInput, 'john.doe@example.co.uk');
        await userEvent.type(passInput, 'Password123!');
        await userEvent.type(confirmPassInput, 'Password123!');
        await userEvent.type(phoneInput, '07512345678');
        await userEvent.selectOptions(allergyInput, 'no');

        //Check input for correct values
        expect(firstNameInput).toHaveValue('John');
        expect(lastNameInput).toHaveValue('Doe');
        expect(emailInput).toHaveValue('john.doe@example.co.uk');
        expect(passInput).toHaveValue('Password123!');
        expect(confirmPassInput).toHaveValue('Password123!');
        expect(phoneInput).toHaveValue('07512345678');
        expect(allergyInput).toHaveValue('no');

        //Simulate clicking register button
        await userEvent.click(registerButton);

        //Wait for the post function to be called with the correct data
        await waitFor(() => {
          expect(mockPost).toHaveBeenCalledWith('/post/registerUser', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.co.uk',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            phoneNumber: '07512345678',
            allergies: 'no',
          })
        });
      });

      test('Form cannot be submitted with empty fields', async () => {
        const mockPost = jest.fn();
        useForm.mockReturnValue({
                data: { 
                  firstName: '',
                  lastName: '',
                  email:'',
                  password: '',
                  confirmPassword: '',
                  phoneNumber: '',
                  allergies: 'no',
                  allergyInfo: '' 
                },
                setData: jest.fn(),
                post: mockPost,
                errors: {},
            });

        render(<RegisterPage/>);

        //Get inputs
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByTestId('email-input');
        const passInput = screen.getByTestId('password-input');
        const confirmPassInput = screen.getByTestId('confirm-password-input');
        const phoneInput = screen.getByLabelText(/phone number/i);
        const allergyInput = screen.getByRole('combobox', { name: /do you have allergies/i });
        const registerButton = screen.getByRole('button', { name: /register/i });
        
        //Simulate clicking register button
        await userEvent.click(registerButton);

        //Wait for validation (HTML5 default browser validations)
        await waitFor(() => {
          expect(firstNameInput).toBeInvalid();
          expect(lastNameInput).toBeInvalid();
          expect(emailInput).toBeInvalid();
          expect(passInput).toBeInvalid();
          expect(confirmPassInput).toBeInvalid();
          expect(phoneInput).toBeInvalid();
        });

        //Ensure the post function was not called since the form was not submitted
        await waitFor(() => expect(mockPost).not.toHaveBeenCalled());
    });
});

