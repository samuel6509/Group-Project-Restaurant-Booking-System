import React from 'react';
import Layout from '../Layouts/GenericLayout';
import { usePage } from '@inertiajs/react';

//Main BookingSuccessPage component
const BookingSuccessPage = () => {
    //Get reservation details from Intertia page props
    //Retrieves data from previous page server side
    const { reservation } = usePage().props;

    return (
        <Layout>
            {/*Booking success section*/}
            <section id="booking-success" className="py-5 text-center">
                <div className="container col-md-6 shadow p-5 rounded bg-light">
                    {/*Checks if reservation data is available*/}
                    {reservation ? (
                        <>
                            {/*Success message displayed if reservation exists*/}
                            <h2 className="text-success fw-bold">Reservation Successful!</h2>
                            <p className="lead">Thank you, <strong>{reservation.name}</strong>, for booking with us.</p>
                            <p>You will receive a confirmation email shortly at <strong>{reservation.email}</strong></p>
                            {/*Display reservatin details*/}
                            <div className="alert alert-info">
                                <h4>Your Booking Details</h4>
                                <p><strong>Reference Code:</strong> {reservation.referenceCode}</p>
                                <p><strong>Date:</strong> {reservation.reservationDate}</p>
                                <p><strong>Time:</strong> {reservation.reservationTime}</p>
                                <p><strong>Guests:</strong> {reservation.numGuests}</p>
                            </div>
                        </>
                    ) : (
                        <>  {/*Error message if reservation data not found*/}
                            <h2 className="text-danger fw-bold">No Reservation Found!</h2>
                            <p className="lead">There was an issue retrieving your booking details.</p>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BookingSuccessPage;
