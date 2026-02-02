import React, { useState, useEffect } from 'react';
import Layout from '../Layouts/GenericLayout';
import { Inertia } from '@inertiajs/inertia';

// Components that add the main content onto our home page
const HomePage = ({ reviews }) => {
    // State to hold reviews, special meals, and cuisines
    const [newReviews, setNewReviews] = useState(reviews || []); // Reviews state
    const [specialMeals, setSpecialMeals] = useState([]); // Special meals state
    const [cuisines, setCuisines] = useState([]); // "Why Choose Us" cuisines state

    // Fetch reviews, special meals, and cuisines when the page updates or changes
    useEffect(() => {
        // Function to fetch reviews from the server
        const getReviews = async () => {
            try {
                const response = await fetch('/get/reviews'); // Fetch reviews
                const data = await response.json();
                setNewReviews(data.reviews); // Update reviews state
            } catch (error) {
                console.error('Error with getting the reviews: ', error);
            }
        };

        // Function to fetch special meals from the server
        const getSpecialMeals = async () => {
            try {
                const response = await fetch('/api/special-meals'); // Fetch special meals
                const data = await response.json();
                setSpecialMeals(data.specialMeals); // Update special meals state
            } catch (error) {
                console.error('There was an Error fetching the special meals:', error);
            }
        };

        // Function to fetch cuisines from the server
        const getCuisines = async () => {
            try {
                const response = await fetch('/api/cuisines'); // Corrected the URL to /api/cuisines
                const data = await response.json();
                setCuisines(data.cuisines); // Update state with the cuisines data
            } catch (error) {
                console.error('There was an Error fetching the cuisines:', error);
            }
        };
    
        // Fetch all data initially
        getReviews();
        getSpecialMeals();
        getCuisines();

        // Set intervals to refresh data periodically
        const reviewInterval = setInterval(() => {
            getReviews();
        }, 5000); // Refresh reviews every 5 seconds

        const mealInterval = setInterval(() => {
            getSpecialMeals();
        }, 60000); // Refresh special meals every 60 seconds

        const cuisineInterval = setInterval(() => {
            getCuisines();
        }, 40000); // Refresh cuisines every 60 seconds

        // Cleanup intervals when component unmounts
        return () => {
            clearInterval(reviewInterval);
            clearInterval(mealInterval);
            clearInterval(cuisineInterval);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <Layout>
      <section id="hero-section">
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="col-10 col-sm-8 col-lg-6 ">
              <img src="/images/steak_dish.png" className="d-block mx-lg-auto img-fluid dish-image" alt="Steak Dish" width="700" height="500" loading="lazy"/> 
              </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Enjoy <span id="heroTextStyle">Tasty</span> & <span id="heroTextStyle">Delicious</span> Food at La Dolce Vita!</h1>
                <p className="lead">Juicy, succulent, and tender on-the-bone chicken, marinated in our special blend of spices. Experience the finest flavors at the best restaurant in town.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 visit-now-button" onClick={() => Inertia.visit('/booking')}>Book a table</button>
                  <button type="button" className="view-menu-button btn-lg px-4 me-md-2" onClick={() => Inertia.visit('/morningMenu')}>View our Menu</button>
                </div>
              </div>
            </div>
        </div>
      </section>
    
    
      {/* Our Special Meals Section  */}
      
    <section className="section__container special__container" id="special">
        <h2 className="section__header">Our Special Dishes</h2>
        <p className="section__description">Each dish promises an unforgettable dining experience, blending innovation with tradition to delight your senses</p>
        <div className="special__grid">
                    {specialMeals.length > 0 ? (
                        specialMeals.map((meal) => (
                            <div className="special__card" key={meal.id}>
                                <img src={meal.image_url} alt={`${meal.food_name} pic`} />
                                <h3>{meal.food_name}</h3>
                                <p>{meal.food_description}</p>
                                <div className='special__ratings'>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}><i className="ri-star-fill"></i></span>
                                    ))}
                                </div>
                                <div className="special__footer">
                                    <p className="price">£{meal.price}</p>
                                    <button className="btn">Add to cart</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading special meals...</p>
                    )}
                </div>
            </section>

    {/* Why people Choose us Section */}
    <section id='Choose-us-section'>
    <div className="container col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="/images/whyChooseUs.png" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="1000" height="1000" loading="lazy"/>
            </div>
            <div className="col-lg-6 mt-0">
                <h2 className="fw-bold text-body-emphasis lh-1 pb-3">Why people Choose us?</h2>
                <ul className="choose-us-section">
                    {cuisines.length > 0 ? (
                        <>
                            <li className="choose-us-item">
                                <div className="content-container mt-3">
                                    <img 
                                        src={cuisines[0].italian_image} 
                                        alt="Italian dish" 
                                    />
                                    <div className="text-container">
                                        <h5>Choose your favourite Italian dish</h5>
                                        <p>Savor delicious Italian dishes at our restaurant, made with the finest ingredients and authentic recipes.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="choose-us-item">
                                <div className="content-container">
                                    <img 
                                        src={cuisines[0].mexican_image} 
                                        alt="Mexican dish" 
                                    />
                                    <div className="text-container">
                                        <h5>Choose your favourite Mexican dish</h5>
                                        <p>Enjoy authentic Mexican dishes at our restaurant, including flavorful tacos and fresh guacamole.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="choose-us-item">
                                <div className="content-container">
                                    <img 
                                        src={cuisines[0].asian_image} 
                                        alt="Asian dish" 
                                    />
                                    <div className="text-container">
                                        <h5>Choose your favourite Asian dish</h5>
                                        <p>Savor authentic Asian cuisine at our restaurant, featuring flavorful stir-fries and aromatic dumplings.</p>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <p>Loading cuisines...</p>
                    )}
                </ul>
            </div>
        </div>
    </div>
</section>



    {/* Testimonial Section */}
    <div className="container pb-5 mb-2">
        <h2 id='testimonial_header'>What our <span id='customer_fancy'>Customers</span> think <span id='testimonial_header'>about</span> us?</h2>
        <div className='row g-2'>
            {/* how the reviews are rendered onto the page */}
            {/* each individual part called from database and rendered as a review */}
            {newReviews.length > 0 ? (
                newReviews.map((review) => (
                    <div className="col-md-4" key={review.reviewID}>
                        <div className="card p-3 text-center px-4">
                            <div className="user-image">
                                <img src={review.image || '/images/default-user.jpg'} className="rounded-circle" width="80" alt={review.name} />
                            </div>
                        <div className="user-content">
                            <h5 className="mb-0">{review.name}</h5>
                            <span>{review.occupation}</span>
                            <p>{review.content}</p>
                        </div>
                        <div className="ratings">
                            {[...Array(review.rating)].map((_, i) => (
                                <span key={i}><i className="ri-star-fill"></i></span>
                            ))}
                        </div>
                        </div>
                    </div>
                ))
            ) : (
                // incase the reviews arent working or there are no reviews
                <p>Loading reviews...</p>
            )}
        </div>
    </div>
        </Layout>
    );
};
export default HomePage;
