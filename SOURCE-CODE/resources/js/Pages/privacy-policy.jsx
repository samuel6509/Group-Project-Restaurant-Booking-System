import React from 'react';
import Layout from '../Layouts/GenericLayout';

// About page content
const PrivacyPolicy = () => {
    return (
        <Layout>
            <br></br>
    <section id="privacy-policy-section">
        <div className="container pb-5 mb-2">
            <h2 id="privacy_policy_header">Privacy Policy</h2>
            <p className="lead">
                This Privacy Policy explains how we collect, use, and protect your personal data in compliance with applicable UK data protection laws, including the General Data Protection Regulation (GDPR) as retained in UK law, and other relevant legislation.
            </p>
            <h3>1. About Us</h3>
            <p>
                We are committed to protecting your privacy. This Privacy Policy outlines the information we may collect from you and how we use it. Please take the time to read this policy carefully. By using our website, you agree to the terms of this Privacy Policy.
            </p>
            <h3>2. What Information We Collect</h3>
            <p>
                We may collect the following types of information:
                <ul>
                    <li><strong>Information You Provide:</strong></li>
                    <ul>
                        <li>Personal details such as your name, email address, phone number, and other contact information when you fill out forms, make bookings, or contact us.</li>
                        <li>Details provided during the booking process, including preferred dates and times, special requests, and dietary or allergen information to accommodate your needs.</li>
                        <li>Payment details (e.g., card information), when required for processing bookings or purchases.</li>
                    </ul>
                    <li><strong>Automatically Collected Information:</strong></li>
                    <ul>
                        <li>Technical data such as your IP address, browser type, operating system, and details of your visit, including pages viewed, time spent on the site, and referring URLs.</li>
                    </ul>
                    <li><strong>Information from Third Parties:</strong></li>
                    <ul>
                        <li>Data from analytics providers to help us understand how our website is used.</li>
                        <li>Information from advertising partners or other third parties supporting our services, such as tools for reservations or customer communication.</li>
                    </ul>
                </ul>
            </p>
            <h3>3. Use of Cookies</h3>
            <p>
                Our website uses cookies to enhance your browsing experience and to gather analytics on site usage. You can disable cookies through your browser settings; however, some features of the site may not function as intended.
            </p>
            <h3>4. How We Use Your Information</h3>
            <p>
                We use your personal data to:
                <ul>
                    <li>Provide and improve our services.</li>
                    <li>Communicate with you about products, services, or offers.</li>
                    <li>Ensure security and prevent fraud.</li>
                    <li>Fulfil our legal or contractual obligations.</li>
                </ul>
            </p>
            <h3>5. Sharing Your Data</h3>
            <p>
                We may share your data with:
                <ul>
                    <li>Service providers and partners who support our operations.</li>
                    <li>Authorities or regulators, where required by law.</li>
                    <li>Third parties in the event of a business transfer or merger.</li>
                </ul>
            </p>
            <h3>6. Data Security</h3>
            <p>
                We implement appropriate technical and organisational measures to safeguard your data. While we strive to protect your information, no transmission over the internet can be completely secure, and you provide information at your own risk.
            </p>
            <h3>7. Data Retention</h3>
            <p>
                We retain your data only for as long as necessary to fulfil the purposes for which it was collected or to comply with legal requirements.
            </p>
            <h3>8. Your Rights</h3>
            <p>
                Under UK data protection laws, you have the right to:
                <ul>
                    <li>Access, correct, or delete your personal data.</li>
                    <li>Object to or restrict certain types of processing.</li>
                    <li>Withdraw your consent where processing is based on consent.</li>
                    <li>Lodge a complaint with the Information Commissioner’s Office (ICO).</li>
                </ul>
                To exercise your rights, please contact us at: <a href="mailto:data@dolcevita.com">data@dolcevita.com</a>
            </p>
            <h3>9. Children</h3>
            <p>
                We do not knowingly collect personal data from children under 16 without parental or guardian consent.
            </p>
            <h3>10. Changes to This Policy</h3>
            <p>
                We may update this Privacy Policy from time to time. Please check our website for the latest version.
            </p>
            <h3>11. Contact</h3>
            <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at: <a href="mailto:data@dolcevita.com">data@dolcevita.com</a>
            </p>
        </div>
    </section>
</Layout>

    );
};

export default PrivacyPolicy;
