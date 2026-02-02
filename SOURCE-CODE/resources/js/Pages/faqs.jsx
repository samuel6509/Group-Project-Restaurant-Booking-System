import React from 'react';
import Layout from '../Layouts/GenericLayout';
import FAQ from '../components/FAQ';

const FAQs = () => {
    const faqData = [
        { 
            question: "What are your opening times?", 
            answer: "We’re open Monday to Friday from 11 am to 11 pm, and on weekends from 11 am to 12 am."
        },
        {
            question: "What facilities do you have?", 
            answer: "All our restaurants offer baby-changing facilities, highchairs, and accessible facilities. We accept Android Pay, Apple Pay, and all major credit cards. For parking, you can use Keynes College Car Park; please check for applicable charges."
        },
        { 
            question: "How long will I have my table for?", 
            answer: "All table bookings are allocated a minimum of 1.5 hours. Please check your booking confirmation for your table time or ask our team. However, if your table isn’t reserved after your booking, you are more than welcome to stay longer." 
        },
        { 
            question: "How do I change the date/time of my booking?", 
            answer: "At the bottom of the confirmation email related to your booking, you’ll find a link where you can modify your reservation." 
        }
    ];

    return (
        <Layout>
            <section id="faq-section">
                <div className="container pb-5 mb-2">
                    <h2 id="about_header">Frequently Asked Questions</h2>
                    <br></br>
                <FAQ faqs={faqData} />
            </div>
            </section>

            
        </Layout>
    );
};

export default FAQs;
