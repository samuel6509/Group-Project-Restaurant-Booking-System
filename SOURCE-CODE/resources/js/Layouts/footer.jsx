import React from 'react';

const Footer = () => {
  return (
    <div className="footer-background">
                <div className="container footer">
                <footer className="py-1 mt-5">
    <div className="row">
        {/* <!-- Where are we section --> */}
        <div className="col-6 col-md-3 mb-3">
            <h5>Where are we</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-1">
                    <a href="#" className="nav-link p-0 text-body-secondary">1 Kensington Palace Gardens</a>
                </li>
                <li className="nav-item mb-1">
                    <a href="#" className="nav-link p-0 text-body-secondary">London</a>
                </li>
                <li className="nav-item mb-1">
                    <a href="#" className="nav-link p-0 text-body-secondary">W8 4QP</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link p-0 text-body-secondary">United Kingdom</a>
                </li>
            </ul>
        </div>

        {/* <!-- Contact Us Section --> */}
        <div className="col-6 col-md-3 mb-3 contact-us">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-1">
                    <a href="/contact-us" className="nav-link p-0 text-body-secondary">Contact Us</a>
                </li>
                <li className="nav-item mb-1">
                    <a href="/faqs" className="nav-link p-0 text-body-secondary">Faqs</a>
                </li>
                <li className="nav-item">
                    <a href="/about" className="nav-link p-0 text-body-secondary">About Us</a>
                </li>
                <li className="nav-item">
                    <a href="/privacy-policy" className="nav-link p-0 text-body-secondary">Privacy Policy</a>
                </li>
            </ul>
        </div>

        {/* <!-- Newsletter Section --> */}
        <div className="col-md-5 ms-auto mb-3">
            <form>
                <h5>Subscribe to our newsletter</h5>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2 pt-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                    <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
            </form>
        </div>
    </div>
</footer>

                </div>
            </div>
  );
};

export default Footer;