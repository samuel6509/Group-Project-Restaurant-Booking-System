import React from 'react';
import Layout from '../Layouts/GenericLayout';

<title>About Us</title>
// Components that adds the main content onto our home page 
const About = () => {
    return (
        <Layout>
           <section id="about-section">
                <div className="container pb-5 mb-2">
                    <h2 id="about_header">About Us</h2>
                    <p className="lead">
                        Dolce Vita is located in Keynes College on the University of Kent Canterbury campus and has long been a favorite hotspot for both locals and visitors throughout Southeast England. The restaurant attracts a diverse clientele, from university students to families.
                        <br />
                        The burst of flavors on our new, exciting menu is just one of the attractions for our regulars. Our restaurants have been carefully designed and decorated to provide our customers with the best dining experience. At Dolce Vita, we don’t just promise to serve you the finest ingredients; we also offer top-notch service and an inviting ambiance.
                    </p>
                </div>
            </section>

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
