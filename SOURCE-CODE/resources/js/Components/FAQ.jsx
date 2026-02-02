import React from 'react';
import FAQItem from './FAQItem';

const FAQ = ({ faqs }) => {
    return (
        <div className="faq-container">
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default FAQ;