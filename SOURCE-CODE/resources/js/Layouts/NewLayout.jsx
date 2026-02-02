import React, { useEffect, useRef, useState } from "react";

const NewLayout = ({ children }) => {
    const [search, setSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const searchRef = useRef(null);
    const userInputRef = useRef(null);

    // toggles the search bar
    // when search bar is opened can type straight away
    const toggleSearchBar = () => {
        setSearch(!search);

        if (!search) {
            setTimeout(() => {
                userInputRef.current.focus();
            }, 0);
        }
    };

    // search bar / searching logic
    // turns input into lowercase
    const startSearch = (event) => {
        event.preventDefault();
        console.log("Searching!", searchInput);
        const url = encodeURIComponent(searchInput.trim().toLowerCase()); // trim user input

        if (url) {
            window.location.href = `/${url}`; // user input made into url
        }
    };

    useEffect(() => {
        const outsideClick = (event) => {
            // if click is outside of the dropdown then close it
            // if (
            //     dropdownRef.current &&
            //     !dropdownRef.current.contains(event.target)
            // ) {
            //     setOpen(false);
            // }
            // if click is outside of search bar close it
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setSearch(false);
            }
        };
        document.addEventListener("mousedown", outsideClick);
        return () => {
            document.removeEventListener("mousedown", outsideClick);
        };
    });

    useEffect(() => {
        const menu = document.getElementById("menu");
        document.getElementById("open-menu").addEventListener("click", () => {
            menu.classList.remove("off");
            menu.classList.add("active");
        });
        document.getElementById("close-menu").addEventListener("click", () => {
            menu.classList.remove("active");
            menu.classList.add("off");
        });
    }, []);

    return (
        <div>
            <header>
                <p className="org-id poppins-extrabold">La Dolce Vita</p>
                <nav>
                    <div className="menu" id="menu">
                        <button id="close-menu">
                            <i className="fa fa-close fa-2x"></i>
                        </button>
                        <div className="menu-class">
                            <p className="head"><a href="/home" className="nav-link">Home</a></p>
                        </div>
                        <div className="menu-class">
                            <p className="head">Categories</p>
                            <ul className="list">
                                <li>Fruits and Vegetables</li>
                                <li>Grains and Cereals</li>
                                <li>Meat and Seafood</li>
                                <li>Dairy Products</li>
                                <li>More Item</li>
                                <li>More Item</li>
                                <li>More Item</li>
                                <li>More Items..</li>
                            </ul>
                        </div>
                        <div className="menu-class">
                            <p className="head">Food Menu</p>
                            <ul className="list">
                                <li><a href="#">Morning Menu</a></li>
                                <li><a href="#">Evening Menu</a></li>
                                <li><a href="#">Kids Menu</a></li>
                            </ul>
                        </div>
                        <div className="menu-class">
                            <p className="head"><a href="/booking" className="nav-link">Booking</a></p>
                        </div>
                        <div className="menu-class">
                            <p className="head">About</p>
                        </div>
                        
                    </div>
                    <div className="search-container" ref={searchRef}>
                        <svg
                            onClick={toggleSearchBar}
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            fill="currentColor"
                            className="bi bi-search mx-3"
                            viewBox="0 0 16 16"
                            style={{ cursor: "pointer" }}
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        {search && (
                            <form
                                onSubmit={startSearch}
                                className="search-bar"
                                style={{
                                    position: "absolute",
                                    top: "25px",
                                    left: "-100px",
                                    maxWidth: "200px",
                                    zIndex: "1000",
                                }}
                            >
                                <input
                                    ref={userInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    className="search-input"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                >
                                    Go
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="user-menu">
                        <button>
                            <i className="fa-regular fa-user"></i>
                        </button>
                        <button>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                    </div>
                    <button id="open-menu">
                        <i className="fa fa-bars"></i>
                    </button>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default NewLayout;