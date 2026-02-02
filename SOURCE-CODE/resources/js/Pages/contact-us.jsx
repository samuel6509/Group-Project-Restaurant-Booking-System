import React from 'react';
import Layout from '../Layouts/GenericLayout';
import { useForm } from "@inertiajs/react";


<title>About Us</title>
// Components that adds the main content onto our home page 
const About = () => {
      const { data, setData, post, errors } = useForm({
          name: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
      });
       const handleSubmit = (e) => {
           e.preventDefault();
           post("/contact-us");
       };


    return (
        <Layout>
            <div
                className="header-container"
                style={{
                    backgroundColor: "white",
                    margin: "20px 0",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                <h2 id="about_header">Contact</h2>
                <h4>Tell us all about it</h4>
                <p className="lead">
                    You can fill the form below or email us at{" "}
                    <b>dolchevita@kent.ac.uk</b>
                </p>
            </div>
            <div
                className="flex-container"
                style={{ display: "flex", gap: "20px" }}
            >
                {/* Contact Form Section */}
                <div style={{ flex: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Your Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            {errors.name && (
                                <span
                                    style={{ color: "red", fontSize: "14px" }}
                                >
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="form-control"
                                placeholder="Your Email"
                                required
                            />
                            {errors.email && (
                                <span
                                    style={{ color: "red", fontSize: "14px" }}
                                >
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Phone Number Section */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">+44</span>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="form-control"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="Your Phone Number"
                                    required
                                />
                            </div>
                            {errors.phone && (
                                <span
                                    style={{ color: "red", fontSize: "14px" }}
                                >
                                    {errors.phone}
                                </span>
                            )}
                        </div>

                        {/* Topic Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="topic" className="form-label">
                                Topic
                            </label>
                            <select
                                value={data.topic}
                                onChange={(e) =>
                                    setData("topic", e.target.value)
                                }
                                id="topic"
                                className="form-select"
                                required
                            >
                                <option value="">Select a Topic</option>
                                <option value="complaints">Complaints</option>
                                <option value="reservation">Reservation</option>
                                <option value="promotions">Promotions</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.topic && (
                                <span
                                    style={{ color: "red", fontSize: "14px" }}
                                >
                                    {errors.topic}
                                </span>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="4"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                placeholder="Your Message"
                                required
                            ></textarea>
                            {errors.message && (
                                <span
                                    style={{ color: "red", fontSize: "14px" }}
                                >
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Flexbox Container for Opening Hours and Google Maps */}
            <div className="flex-container">
                {/* Opening Hours Section */}
                <div style={{ flex: 1 }}>
                    <h2>Opening Hours</h2>
                    <p>Monday: 11 AM - 11 PM</p>
                    <p>Tuesday: 11 AM - 11 PM</p>
                    <p>Wednesday: 11 AM - 11 PM</p>
                    <p>Thursday: 11 AM - 11 PM</p>
                    <p>Friday: 11 AM - 11 PM</p>
                    <p>Saturday: 11 AM - 12 AM</p>
                    <p>Sunday: 11 AM - 12 AM</p>
                </div>

                {/* Google Maps Section */}
                <div style={{ flex: 1 }}>
                    <h2>How to Find Us</h2>
                    <iframe
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2494.8494026031226!2d1.0606136888718611!3d51.29549539896635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47decba69fdbc503%3A0xfe7b9e337deaae23!2sKeynes%20College!5e0!3m2!1sen!2suk!4v1730647210530!5m2!1sen!2suk"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </Layout>
    );
};
export default About;
