// created by sw734
// this page is inspired by the BookingReservationPage

    import React, { useState } from 'react'
    import Layout from '../Layouts/GenericLayout'
    import { useForm } from '@inertiajs/react'

const RegisterPage = () =>
{
    const [passwordError, setPasswordError] = useState('') //error message for mismatched passwords
    const [passwordVisibility, setPasswordVisibility] = useState(false) // controls password visibility 
    const {data:registerData, setData:setRegisterData, post, errors} = useForm
    ({
        // default state of registration form
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        allergies: 'no', // ENUM in db defaulting as no 
        allergyInfo: ''
    })

    // updates the values in the form
    const update = (event) => 
    {
        const {name, value} = event.target
        setRegisterData
        ({
            ...registerData,
            [name]: value
        })

        // once one of these fields is changed the error message goes
        if (name === 'password' || name === 'confirmPassword') 
        {
            setPasswordError('');
        }
        // do not let user exeed 11 digits
        if (name === 'phoneNumber') 
        {
            if (value.length > 11) 
            {
                return;
            }
        }
    }

    // sends the form to the db by POST
    const submit = (event) =>
    {
        event.preventDefault()

        // if passwords do not match
        if(registerData.password !== registerData.confirmPassword)
        {
            setPasswordError('Your passwords do not match, Please try again.');
        }

        post('/post/registerUser', registerData,)
    }

    return (
        <Layout>
            <section id = 'registration'>
                <div className = 'container col-xxl-8 px-4 py-5'>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Register a new account:</h2>
                    <p className='registrationInfo'>Please create an account for La Dolce Vita, if you already have an account please continue to the <a href="/loginUser" className='link'>login page</a>.</p>
                    <form onSubmit={submit} className='registrationForm'>
                        <div className='mb-3'>
                            <label htmlFor="firstName" className='registerName'>First Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='firstName'
                                name='firstName'
                                value={registerData.firstName}
                                onChange={update}
                                required
                            />
                            {/* error message for invalid first name rendered from conrtoller
                                this logic is use a lot in this page */}
                            {errors.firstName && 
                            (
                                <span style={styles.error}>{errors.firstName}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="lastName" className='registerName'>Last Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='lastName'
                                name='lastName'
                                value={registerData.lastName}
                                onChange={update}
                                required
                            />
                            {errors.lastName && 
                            (
                                <span style={styles.error}>{errors.lastName}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className='registerName'>Email:</label>
                            <input
                                id='email'
                                type="email"
                                className='form-control'
                                name='email'
                                data-testid="email-input"
                                placeholder='example@example.co.uk'
                                value={registerData.email}
                                onChange={update}
                                required
                            />
                            {errors.email && 
                            (
                                <span style={styles.error}>{errors.email}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <label htmlFor="password" className='registerName'>Password:</label>
                                {/* bootstrap and inline css so I change this specific element of this class */}
                                <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', marginLeft: '-100px' }}>
                                    <label htmlFor="passwordVisibility" className='registerName mb-0 me-2'>Show Password:</label>
                                    <input
                                        type='checkbox'
                                        className='form-check-input'
                                        id='passwordVisibility'
                                        name='passwordVisibility'
                                        checked={passwordVisibility}
                                        onChange={(e) => setPasswordVisibility(e.target.checked)}
                                    />
                                </div>
                            </div>
                            <input
                            // toggles password visibility
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='password'
                                name='password'
                                value={registerData.password}
                                onChange={update}
                                required
                                data-testid="password-input"
                            />
                            {errors.password && 
                            (
                                <span style={styles.error}>{errors.password}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmPassword" className='registerName'>Confirm Password:</label>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={registerData.confirmPassword}
                                onChange={update}
                                required
                                data-testid="confirm-password-input"
                            />
                            {passwordError && 
                            (
                                <span style={styles.error}>{passwordError}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phoneNumber" className='registerName'>Phone Number:</label>
                            <input
                                type="tel"
                                className='form-control'
                                id='phoneNumber'
                                name='phoneNumber'
                                pattern='[0-9]{11}'
                                placeholder='07712345678'
                                // phone number must be numbers and no more than 11 digits 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)}
                                value={registerData.phoneNumber}
                                onChange={update}
                                required
                            />
                            {errors.phoneNumber && 
                            (
                                <span style={styles.error}>{errors.phoneNumber}</span>
                            )}
                        </div>
                        <div className='mb-5 text-center'>
                            <label htmlFor="allergies" className='registerName me-2'>Do you have allergies?</label>
                            <select
                                className='form-select d-inline-block w-auto'
                                id='allergies'
                                name='allergies'
                                value={registerData.allergies}
                                onChange={update}
                                required
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        {/* if the user has chosen yes to having allergies then a text box appears
                            where they can tell their allergies */}
                        {registerData.allergies === 'yes' && (
                            <div className='mb-5 text-center'>
                                <div>
                                    <label htmlFor="allergyInfo" className='registerName mb-2'>List your allergies here:</label>
                                </div>
                                <textarea
                                    className='form-control d-inline-block'
                                    id='allergyInfo'
                                    name='allergyInfo'
                                    // only an example of how to write allergies
                                    placeholder='for example... nuts, dairy, gluten'
                                    value={registerData.allergyInfo}
                                    onChange={update}
                                    rows="5"
                                    style={{ width: '50%', minHeight: '100px' }}
                                />
                                {errors.allergyInfo && 
                                (
                                    <span style={styles.error}>{errors.allergyInfo}</span>
                                )}
                            </div>
                        )}
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
// error message styling
const styles =
{
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
}

export default RegisterPage