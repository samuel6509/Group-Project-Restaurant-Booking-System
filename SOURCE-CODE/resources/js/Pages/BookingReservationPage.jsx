import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../Layouts/GenericLayout';
import { Inertia } from '@inertiajs/inertia';

//Dummy data for table types and prices
const dummyData = {
    regular: [
        { id: 1, image: "https://via.placeholder.com/150", price: "$50" },
        { id: 2, image: "https://via.placeholder.com/150", price: "$55" },
    ],
    vip: [
        { id: 3, image: "https://via.placeholder.com/150", price: "$100" },
        { id: 4, image: "https://via.placeholder.com/150", price: "$120" },
    ],
};

//Main BookingReservationPage component
const BookingReservationPage = ({ message }) => {
    //State for booking data
    const [timer, setTimer] = useState(900);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        specialRequest: ''
    });
    //State for table types
    const [selectedType, setSelectedType] = useState("regular");
    const tables = useMemo(() => dummyData[selectedType], [selectedType]);
    const [selectedTable, setSelectedTable] = useState(null);

    //State to store errors
    const [formErrors, setFormErrors] = useState({});

    //Effect to manage timer
    useEffect(() => {
        // Form timer countdown
        if (timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            alert('Time expired! Please try reserving again.');
            resetForm();
        }
    }, [timer]);

    //Reset form and timer after timeout or submission
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: '',
            specialRequest: ''
        });
        setFormErrors({});
        setTimer(900);
    };

    //Format timer to display (mm:ss)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    //Change timer color
    const getTimerColor = () => {
        if (timer > 300) return 'green';
        if (timer > 60) return 'orange';
        return 'red';
    };

    //Handle input changes for form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Validate form data before submission
    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required.';
        if (!formData.email) errors.email = 'Email is required.';
        if (!formData.phone) errors.phone = 'Phone number is required.';
        if (!formData.date) errors.date = 'Date is required.';
        if (!formData.time) errors.time = 'Time slot is required.';
        if (!formData.guests) errors.guests = 'Number of guests is required.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0; //Returns true if no errors
    };

    //Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        //Validate form before processing
        if (!validateForm()) {
            return;
        }
        
        //Prepare payload for submission
        const payload = {
            name: formData.name,
            reservationDate: formData.date,
            reservationTime: formData.time,
            numGuests: formData.guests,
            specialRequests: formData.specialRequest,
            phoneNumber: formData.phone,
            email: formData.email,
        };  

        //Submit data using Inertia
        Inertia.post('/booking', payload, {
            onSuccess: () => {
            },
            onError: (errors) => {
                setFormErrors(errors);
            }
        });
    };

    //Group timeslots into Morning, Afternoon and Evening
    const groupTimeSlots = () => {
        const start = 9 * 60; // 9:00 AM in minutes
        const end = 20 * 60; // 8:00 PM in minutes
        const interval = 15; // 15-minute intervals
        const slots = [];

        for (let time = start; time <= end; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

            if (hours < 12) {
                slots.push({ group: 'Morning', time: formattedTime });
            } else if (hours < 17) {
                slots.push({ group: 'Afternoon', time: formattedTime });
            } else {
                slots.push({ group: 'Evening', time: formattedTime });
            }
        }

        return slots;
    };
    
    //Reduce timeslots into groups
    const timeSlotGroups = groupTimeSlots().reduce((groups, slot) => {
        if (!groups[slot.group]) groups[slot.group] = [];
        groups[slot.group].push(slot.time);
        return groups;
    }, {});

    return (
        <Layout>
            {/*Booking section container*/}
            <section id="booking-section" className="py-5">
                <div className="container col-xxl-8 px-4 py-5">
                    <div className={`timer-display text-center mb-4 ${getTimerColor()}`}>
                        <h3>Time left to complete your booking: {formatTime(timer)}</h3>
                        <div className="progress mt-2">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${(timer / 900) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/*Booking form header*/}
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3">Book Your Table</h2>
                    <p className="lead">Reserve a table at La Dolce Vita and enjoy an unforgettable dining experience!</p>

                    {/*Booking Form*/}
                    <form role="form" onSubmit={handleSubmit}>
                        {/*Name input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            />
                            {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                        </div>
                        {/*Email input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                data-testid="email-input"
                                onChange={handleChange}
                                value={formData.email}
                                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            />
                            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                        </div>
                        {/*Phone number input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="phone">Phone</label>
                            <div className="input-group">
                                <span className="input-group-text">+44</span>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    pattern="[0-9]{11}"
                                    placeholder="07512399932"
                                    onChange={handleChange}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                                    value={formData.phone}
                                    className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                />
                            </div>
                            {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                        </div>
                        {/*Date input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={formData.date}
                                className={`form-control ${formErrors.date ? 'is-invalid' : ''}`}
                            />
                            {formErrors.date && <div className="text-danger">{formErrors.date}</div>}
                        </div>
                        {/*Timeslot selection*/}
                        <div className="form-group mb-3">
                            <label htmlFor="time">Select a Time Slot</label>
                            {Object.keys(timeSlotGroups).map((group) => (
                                <div key={group}>
                                    <h4>{group}</h4>
                                    <div className="d-flex flex-wrap gap-2">
                                        {timeSlotGroups[group].map((slot, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    handleChange({ target: { name: 'time', value: slot } })
                                                }
                                                className={`btn text-white 
                                                    ${formData.time === slot ? 'bg-green-600' : 'bg-orange-500'}
                                                    hover:bg-green-700 focus:ring-4 focus:ring-green-400 transition-all`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {formErrors.time && <div className="text-danger">{formErrors.time}</div>}
                        </div>
                        {/*Guests input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="guests">Guests</label>
                            <input
                                id="guests"
                                type="number"
                                name="guests"
                                onChange={handleChange}
                                value={formData.guests}
                                className={`form-control ${formErrors.guests ? 'is-invalid' : ''}`}
                            />
                            {formErrors.guests && <div className="text-danger">{formErrors.guests}</div>}
                        </div>
                        {/*Table selection*/}
                        <div className='form-group mb-3'>
                            <h1 className="text-2xl font-bold mb-4">Select a Table</h1>

                            <div className="flex gap-5 mb-5">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="regular"
                                        checked={selectedType === "regular"}
                                        onChange={() => setSelectedType("regular")}
                                    />
                                    Regular Table
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="vip"
                                        checked={selectedType === "vip"}
                                        onChange={() => setSelectedType("vip")}
                                    />
                                    VIP Table
                                </label>
                            </div>
                            {/*Table options*/}
                            <div className="flex flex-wrap gap-5">
                                {tables.map((table) => (
                                    <label
                                        key={table.id}
                                        className={`p-4 border rounded-lg cursor-pointer shadow-md w-[18rem] flex flex-col items-center gap-2 
            transition-all duration-200 ease-in-out 
            hover:border-blue-400 
            focus-within:ring-2 focus-within:ring-blue-500 
            outline-none 
            ${selectedTable === table.id ? "border-blue-500" : "border-gray-300"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="tableSelection"
                                            value={table.id}
                                            checked={selectedTable === table.id}
                                            onChange={() => setSelectedTable(table.id)}
                                            className="hidden"
                                        />

                                        <img src={table.image_url} alt="Table" className="w-full h-24 object-contain rounded-md" />
        
                                    </label>
                                ))}


                            </div>
                        </div>
                        {/*Special request input*/}
                        <div className="form-group mb-3">
                            <label htmlFor="specialRequest">Special Request</label>
                            <textarea
                                id="specialRequest"
                                name="specialRequest"
                                onChange={handleChange}
                                value={formData.specialRequest}
                                className="form-control"
                                rows="3"
                            ></textarea>
                        </div>
                        {/*Submit button*/}
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Reserve Table</button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default BookingReservationPage;
