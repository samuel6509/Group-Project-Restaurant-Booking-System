// The template used for most pages on our web application

// TODO:

import React, { useState, useEffect, useRef} from 'react'
import { Helmet } from 'react-helmet'
import { Inertia } from '@inertiajs/inertia'
import Footer from './footer';


const GenericLayout = ({ children }) => {

    // used to store messages
    const [popup, setPopup] = useState('')
    const [fading, setFading] = useState(false)
    // used to set the state of different parts of the layout
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [profile, setProfile] = useState(false)
    // used to toggle different parts of the layout 
    const dropdownRef = useRef(null)
    const searchRef = useRef(null)
    const userInputRef = useRef(null)
    const profileRef = useRef(null) // profile drop down

    // function to logout user
    const logout = () => 
        {
            Inertia.post('/logoutUser', {}, 
            {
                // function to store message so it can be seen after page refreshes
                onFinish: () =>
                {
                    // storing message in session storage to be seen on other pages
                    const message = 'You have been logged out.'
                    sessionStorage.setItem('loggedOutMessage', message)
                    setLoggedOutMessage(message)
                }
            })
        }
    
        // useEffect function to retrieve loggedOutMessage & display it 
        useEffect(() => 
        {
            // array to hold all current incoming messages
            const incomingMessages = []

            // if there is a message add to array & remove from session storage
            // if you are using session storage add the message here so it can be rendered
            const loggedOutMessage = sessionStorage.getItem('loggedOutMessage')
            if(loggedOutMessage)
            {
                incomingMessages.push(loggedOutMessage)
                sessionStorage.removeItem('loggedOutMessage')
            }
            const ratingMessage = sessionStorage.getItem('ratingMessage')
            if(ratingMessage)
            {
                incomingMessages.push(ratingMessage)
                sessionStorage.removeItem('ratingMessage')
            }

            // if there are any messages
            if(incomingMessages.length > 0)
            {
                // break line between messages
                const messagesBrokenUp = incomingMessages.map((message, index) => 
                (
                    <p key={index}>{message}</p>
                ))

                // display the incoming messages onto the screen
                setPopup(messagesBrokenUp)

                // begin fade out after 5 seconds
                setTimeout(() =>
                {
                    setFading(true)
                }, 5000)

                // after 10 seconds the message is cleared from the page
                setTimeout(() =>
                {
                    setPopup('')
                    setFading(false)
                }, 10000) // 10 seconds, 5 seconds until fade begins & 5 seconds to fully fade away
            }
        }, [])

    // toggles profile drop down
    const toggleProfile = () => {
        setProfile(!profile)
    }
    
    // toggles the dropdown
    const toggleDropdown = () => {
        setOpen(!open)
    }

    // toggles the search bar
    // when search bar is opened can type straight away
    const toggleSearchBar = () => {
        setSearch(!search)

        if(!search)
        {
            setTimeout(() =>
            {
                userInputRef.current.focus();
            }, 0)
        }
    }

    // search bar / searching logic
    // turns input into lowercase 
    const startSearch = (event) => {
        event.preventDefault();
        console.log('Searching!', searchInput);
        const url = encodeURIComponent(searchInput.trim().toLowerCase()); // trim user input

        if(url)
        {
            window.location.href = `/${url}`; // user input made into url
        }
    }

    // logic for closing dropdown & search bar when clicking somewhere that is not them
    useEffect(() => {
        const outsideClick = (event) => {
            // if click is outside of the dropdown then close it
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) 
            {
                setOpen(false)
            }
            // if click is outside of search bar close it
            if(searchRef.current && !searchRef.current.contains(event.target))
            {
                setSearch(false)
            }
            // if click is outside profile dropdown then close it
            if(profileRef.current && !profileRef.current.contains(event.target))
            {
                setProfile(false)
            }
        }
        document.addEventListener("mousedown", outsideClick);
        return () => {
            document.removeEventListener("mousedown", outsideClick);
        }
    })

    // function that returns the user back to our home page
    const homeRedirect = () => {
        console.log('home link working')
        window.location.href = '/home';
    }
    // function that returns the user back to our about page
    const aboutRedirect = () => {
        console.log('about link working')
        window.location.href = '/about'; // placeholder
    }
    // function that returns the user back to our booking page
    const bookingRedirect = () => {
        console.log('booking link working')
        window.location.href = '/booking'; // placeholder
    }
    const likedDishesRedirect = () => {
        window.location.href = '/likedDishes'; // placeholder
    }
    const cartRedirect = () => {
        console.log('cart link working')
        window.location.href = '/cart'; // placeholder
    }
    // function that returns the user back to the home page
    // const homeIconRedirect = () => {
    //     console.log('home icon link working')
    //     window.location.href = '/home'; // placeholder
    // }


    return (
        <div className='vector-background'>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Restaurant Website</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                    crossOrigin="anonymous"
                />
                <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/css/styles.css" />
                <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,400&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>


            </Helmet>

                {/* Header Section */}
                <section id="header-section">
                    <div className="container">
                        <header className="d-flex align-items-center justify-content-between py-3 mb-4 header-bottom-border">
                            <div className="col-auto mx-2">
                                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none restaurant-name">
                                    La Dolce Vita
                                </a>
                            </div>

                            <ul className="nav col-auto header-items d-flex justify-content-center header-items">
                                <li><a href="#" className="nav-link px-2 mx-2" onClick={homeRedirect}>Home</a></li>
                                <li><a href="#" className="nav-link px-2 mx-2" onClick={aboutRedirect}>About</a></li>
                                {/* Menu dropdown */}
                                <li ref={dropdownRef} className='nav-menu dropdown'><a href="#" className="nav-link dropdown-toggle px-2 mx-2" role="button" onClick={toggleDropdown} aria-expanded={setOpen}>Food Menu</a>
                                <ul className={`dropdown-menu ${open ? 'show' : ''}`}>
                                    <li><a className="dropdown-item text-center" href="/morningMenu">Morning Menu</a></li>
                                    <li><a className="dropdown-item text-center" href="/eveningMenu">Evening Menu</a></li>
                                    <li><a className="dropdown-item text-center" href="/kidsMenu">Kids Menu</a></li>
                                </ul> 
                                </li>
                                <li><a href="/booking" className="nav-link px-2 mx-2" onClick={bookingRedirect}>Book Table</a></li>
                                <li><a href="/likedDishes" className="nav-link px-2 mx-2" onClick={likedDishesRedirect}>Favourites</a></li>
                            </ul>

                            {/* Cart button */}
                            <div className="col-auto text-end top-right-buttons d-flex search-login">
                                <svg onClick={cartRedirect} xmlns="http://www.w3.org/2000/svg" width="35" height="18" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                                {/* Search bar */}
                            <div className='search-container' ref={searchRef}>
                                <svg onClick={toggleSearchBar} xmlns="http://www.w3.org/2000/svg" width="19" fill="currentColor" className="bi bi-search mx-3" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                                {search && (
                                    <form onSubmit={startSearch} className="search-bar" style={{position: 'absolute', top: '25px', left: '-100px', maxWidth: '200px', zIndex: '1000'}}>
                                    <input ref={userInputRef} type="text" placeholder="Search..." className="search-input" value = {searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                                    <button type="submit" className="btn btn-primary btn-sm">Go</button>
                                </form>
                                )}
                            </div>
                            <div className='nav-menu dropdown' ref={profileRef}>
                                <svg onClick={toggleProfile} xmlns='http://www.w3.org/2000/svg' width="20" fill="currentColor" className="bi bi-person-fill mx-3" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                {profile && (
                                    <ul className={`dropdown-menu ${profile ? 'show' : ''}`}>
                                        <li><a className='dropdown-item' href="registerUser">Register</a></li>
                                        <li><a className='dropdown-item' href="loginUser">Login</a></li>
                                        <li><a className='dropdown-item' href="account">Account Information</a></li>
                                        <li><a className='dropdown-item' href="password">Change Password</a></li>
                                        <li><a className='dropdown-item' href="#" onClick={logout}>Logout</a></li>
                                        <li><a className='dropdown-item' href="submitReview">Create A Review</a></li>
                                        <li><a className='dropdown-item' href="recentOrders">Recent Orders</a></li>
                                    </ul>
                                )}
                            </div>
                            </div>
                        </header>
                    </div>
                </section>

                {/* Where components are rendered to (Components) */}
                <main>
                {popup && (
                <div className={`alert alert-success logged-out-message ${fading ? 'fade' : ''}`} 
                    role="alert"
                >
                {popup}
                </div>
                )}

                {children}
                </main>

                <Footer />
        </div>
    );
};
export default GenericLayout;