import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as InertiaModule from '@inertiajs/inertia';
import BookingReservationPage from '@/Pages/BookingReservationPage';

describe('BookingReservationPage Form', () => {
    test('Fills out the input fields correctly and submits the form', async () => {
    //Render the page
    render(<BookingReservationPage/>);

    //Get inputs
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByTestId('email-input');
    const phoneInput = screen.getByLabelText(/Phone/i);
    const dateInput = screen.getByLabelText(/Date/i);
    const guestsInput = screen.getByLabelText(/Guests/i);
    const specialRequestInput = screen.getByLabelText(/Special Request/i);
    const submitButton = screen.getByRole('button', { name: /reserve table/i });

    //Fill out the form
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'John@example.com');
    await userEvent.type(phoneInput, '07512399932');
    await userEvent.type(dateInput, '2025-05-10');
    await userEvent.type(guestsInput, '4');
    await userEvent.type(specialRequestInput, 'Window seat, please.');

    //Simulate clicking a time slot
    const timeSlotButton = screen.getByText('12:00'); // Example time slot
    await userEvent.click(timeSlotButton);

    //Check input for correct values
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('John@example.com');
    expect(phoneInput).toHaveValue('07512399932');
    expect(dateInput).toHaveValue('2025-05-10');
    expect(guestsInput).toHaveValue(4);
    expect(specialRequestInput).toHaveValue('Window seat, please.');
    expect(timeSlotButton).toHaveClass('bg-green-600'); // checks the timeslot

    //Mock the post method of Inertia
    const postMock = jest.spyOn(InertiaModule.Inertia, 'post').mockImplementation((url, data, options) => {
      //console.log('Mocked Inertia.post called with:', url, data, options);
      return Promise.resolve()
    });

    //Simulate form submission
    await userEvent.click(submitButton);

    //Wait for the mock to be called and check if it was called with the correct data
    await waitFor(() => expect(postMock).toHaveBeenCalledWith('/booking', {
      name: 'John Doe',
      reservationDate: '2025-05-10',
      reservationTime: '12:00',
      numGuests: '4',
      specialRequests: 'Window seat, please.',
      phoneNumber: '07512399932',
      email: 'John@example.com',
    }, expect.any(Object)));

    //Check if the mock post method is called
    expect(postMock).toHaveBeenCalledTimes(1);

    //Clean up mock after test
    postMock.mockRestore();
  });

  test('Shows error messages for invalid inputs (Submitting Empty Form)', async () => {
    render(<BookingReservationPage/>);

    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await userEvent.click(submitButton);

    //Check for validation messages
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time slot is required/i)).toBeInTheDocument();
    expect(screen.getByText(/number of guests is required/i)).toBeInTheDocument();
  })

  test('Does not submit if no time slot is selected', async () => {
    render(<BookingReservationPage />);

    const submitButton = screen.getByRole('button', { name: /reserve table/i });

    //Fill other fields except selecting time slot
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByTestId('email-input'), 'John@example.com');
    await userEvent.type(screen.getByLabelText(/phone/i), '07512399932');
    await userEvent.type(screen.getByLabelText(/date/i), '2025-05-10');
    await userEvent.type(screen.getByLabelText(/guests/i), '4');
    await userEvent.type(screen.getByLabelText(/special request/i), 'Window seat, please.');

    await userEvent.click(submitButton);

    expect(screen.getByText(/time slot is required/i)).toBeInTheDocument();
    });
});
