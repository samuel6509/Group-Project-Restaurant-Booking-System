import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Menu from '../resources/js/Pages/Menu'; // Path to your Menu component
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom'; // For Jest DOM functionality
import { MemoryRouter } from 'react-router-dom'; // Wrap component in router for Link


// Mock the global alert function (since alert() is called in handleAddToCart)
window.alert = jest.fn();

beforeAll(() => {
    document.head.innerHTML += '<meta name="csrf-token" content="mock-csrf-token">';
});

// Mock fetch requests and set up necessary responses
jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => ({ success: true }),
    ok: true,
});

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));


//These tests below pass

test('category button click updates the category state', async () => {
    render(<Menu menuType="food" menuTitle="Menu Title" menuDescription="Delicious Food" />);

    const starterButton = screen.getByText(/Starter/i);
    fireEvent.click(starterButton);

    await waitFor(() => {
        expect(screen.getByText(/Menu Title/i)).toBeInTheDocument();
    });

    expect(starterButton).toHaveClass('active');
});

test('Button works when clicked', async () => {
    jest.spyOn(window, "alert").mockImplementation(() => { });

    const mockUserInfo = {
        userID: 1,
        firstName: 'John',
        lastName: 'Doe',
    };

    const mockMenuItems = [
        {
            itemID: 101,
            itemName: 'Grilled Chicken',
            itemDescription: 'Delicious grilled chicken',
            itemPrice: 10.99,
            itemImageURL: '/images/chicken.jpg',
        },
    ];

    global.fetch = jest.fn((url, options) => {
        if (url === '/user-info-all') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUserInfo),
            });
        }
        if (url === '/menu/main?itemType=starter') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockMenuItems),
            });
        }
        if (url === '/add-to-cart' && options?.method === 'POST') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
                status: 200,
            });
        }
        return Promise.reject(new Error('Unknown API call'));
    });

    render(<Menu menuType="main" menuTitle="Main Menu" menuDescription="Our main dishes" category="starter" />);

    await waitFor(() => expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument());

    await waitFor(() => {
        const itemTitles = screen.getAllByText(/Grilled Chicken/i);
        expect(itemTitles.length).toBeGreaterThan(0);
    });

    const button = screen.getByTestId('add-to-cart-button');
    fireEvent.click(button);

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Item added to cart");
    });
});

test('active class is added to clicked category button', () => {
    render(<Menu menuType="food" menuTitle="Menu Title" menuDescription="Delicious Food" />);

    const starterButton = screen.getByText(/Starter/i);
    const mainButton = screen.getByText(/Main/i);
    const dessertButton = screen.getByText(/Dessert/i);

    fireEvent.click(mainButton);
    expect(mainButton).toHaveClass('active');
    expect(starterButton).not.toHaveClass('active');
    expect(dessertButton).not.toHaveClass('active');
});



// //This passes

test('category switching triggers correct API calls', async () => {
    render(<Menu menuType="food" menuTitle="Menu Title" menuDescription="Delicious Food" />);

    const starterButton = screen.getByText('Starter');
    const mainButton = screen.getByText('Main');
    const dessertButton = screen.getByText('Dessert');

    // Verify that the initial category (starter) is loaded first
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/menu/food?itemType=starter'));

    // Click 'Main' and verify API call
    fireEvent.click(mainButton);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/menu/food?itemType=main'));

    // Click 'Dessert' and verify API call
    fireEvent.click(dessertButton);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/menu/food?itemType=dessert'));
});


// //This passes

test('handles API failure gracefully', async () => {
    // Mock console.error to suppress warnings in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Ensure fetch is mocked
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.reject(new Error('API failed'))
    );

    render(<Menu menuType="main" menuTitle="Main Menu" menuDescription="Our main dishes" />, {
        wrapper: MemoryRouter,
    });

    await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('Error fetching user info:'),
            expect.any(Error)
        );
    });

    // Restore mocks after test
    console.error.mockRestore();
    global.fetch.mockRestore();
});








