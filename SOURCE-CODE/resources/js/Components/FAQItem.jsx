import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleAnswer}>
                <h4>{question}</h4>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

export default FAQItem;