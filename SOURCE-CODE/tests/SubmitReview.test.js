import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SubmitReview from '@/Pages/SubmitReview';
import { useForm } from '@inertiajs/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

//Mocking Inertia's useForm hook
jest.mock('@inertiajs/react', () => ({
    useForm: jest.fn(),
}));

//Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-image-url');

describe('SubmitReview Page', () => {

    beforeEach(() => {
        useForm.mockReturnValue({
            data: {
                name: '',
                occupation: '',
                content: '',
                rating: 0,
                image: null,
            },
            setData: jest.fn(),
            post: jest.fn(),
            errors: {},
        });
    });

    test('Submit review successfully with correct values', async () => {

        const mockPost = jest.fn();
        const setReviewMock = jest.fn();

        useForm.mockReturnValue( {
            data: {
                name: 'John Doe',
                occupation: 'Software Developer',
                content: 'This is an amazing service!',
                rating: 4,
                image: null,
            },
            setData: setReviewMock,
            post: mockPost,
            errors: {},
        });

        render(<SubmitReview/>);

        //Get inputs
        const file = new File(['dummy image'], 'profile.jpg', { type: 'image/jpeg' });
        const imageInput = screen.getByLabelText(/upload your profile picture:/i);
        const nameInput = screen.getByLabelText(/name:/i);
        const occupationInput = screen.getByLabelText(/occupation:/i);
        const contentInput = screen.getByLabelText(/your review:/i);
        const starRating = screen.getAllByText('★'); //Rating element
        const submitButton = screen.getByRole('button', { name: /publish review/i });

        //Simulate file upload
        await userEvent.upload(imageInput, file);

        //Fill out the form
        await userEvent.type(nameInput, 'John Doe');
        await userEvent.type(occupationInput, 'Software Developer');
        await userEvent.type(contentInput, 'This is an amazing service!');

        //Click 4-star rating
        await userEvent.click(starRating[3]);

        //Check if form values are set correctly
        expect(setReviewMock).toHaveBeenCalledWith(expect.objectContaining({
            image: expect.any(File),
        }));

        expect(setReviewMock).toHaveBeenCalledWith(expect.objectContaining({
            name: 'John Doe',
            occupation: 'Software Developer',
            content: 'This is an amazing service!',
            rating: 4,
        }));

        //Simulate clicking the submit button
        await userEvent.click(submitButton)

        //Wait for the form to be submitted with correct data
        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith(
                '/post/submitReview',
                expect.any(FormData), // Check for FormData
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
        });
    });

    test('Form cannot change password with empty fields', async () => {
        const mockPost = jest.fn();
        const setReviewMock = jest.fn();

        useForm.mockReturnValue( {
            data: {
                name: '',
                occupation: '',
                content: '',
                rating: 0,
                image: null,
            },
            setData: setReviewMock,
            post: mockPost,
            errors: {},
        });

        render(<SubmitReview/>);

        //Get Inputs
        const nameInput = screen.getByLabelText(/name:/i);
        const occupationInput = screen.getByLabelText(/occupation:/i);
        const contentInput = screen.getByLabelText(/your review:/i);
        const submitButton = screen.getByRole('button', { name: /publish review/i });

        //Simulate clicking submit button
        await userEvent.click(submitButton);
        
        //Wait for validation (HTML5 default browser validations)
        await waitFor(() => {
            expect(nameInput).toBeInvalid();
            expect(occupationInput).toBeInvalid();
            expect(contentInput).toBeInvalid();
        });

        //Ensure the post function was not called since the form was not submitted
        await waitFor(() => expect(mockPost).not.toHaveBeenCalled());
    });
});