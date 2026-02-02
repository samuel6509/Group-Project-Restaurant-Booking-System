// created by sw734

import Layout from '../Layouts/GenericLayout'
import React, { useState, useEffect } from 'react'
import { useForm} from '@inertiajs/react';

const LoginPage = ({ loggedIn, errors, success}) =>
{
    const [passwordVisibility, setPasswordVisibility] = useState(false) // controls password visibility
    const {data:loginData, setData:setLoginData, post,} = useForm
    ({
        // default state of login form
        email:'',
        password: '',
        rememberMe: false // used to keep user logged in 
    })

    useEffect(() => 
    {
        // make sure to preserve log in inspector to see this
        console.log('User logged in:', loggedIn)

        // use this to check remember me is working
        if (loggedIn) 
        {
            console.log('You are logged in')
        }
    }, [loggedIn])

    // updates the values in the form
    const update = (event) => 
    {
        const {name, value, type, checked} = event.target
        setLoginData
        ({
            ...loginData,
            // if type if checkbox then it will be using checked instead of an actual value 
            [name]: type === 'checkbox' ? checked: value
        })
    }

    // sends the form to the db by POST
    const submit = (event) =>
    {
        event.preventDefault()
        post('/loginUser', loginData,)
    }

    useEffect(() => {
        console.log("Success message:", success);
    }, [success]);
    
    return (
        <Layout>
            <section id = 'registration'>
                <div className = 'login-container'>
                    <div className='login-box'>
                        <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Account Login:</h2>
                        <p className='registrationInfo'>Please log into your La Dolce Vita account, if you have not made an account please <a href="/registerUser" className='link'>register a new account</a>.</p>
                        <form onSubmit={submit} className='registrationForm'>
                            <div className='mb-3'>
                                <div style={{textAlign: "center"}}>
                                    {/* success message for logging in or error message for already being logged in
                                        use this logic alot in this page */}
                                    {success && 
                                    (
                                        <span style={styles.success}>{success}</span>
                                    )}
                                    {errors.already && 
                                    (
                                        <span style={styles.error}>{errors.already}</span>
                                    )}
                                </div>
                                {errors.login && 
                                (
                                    <span style={styles.error}>{errors.login}</span>
                                )}
                                <label htmlFor="email" className='registerName'>Email:</label>
                                <input
                                    type="email"
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    data-testid="email-input"
                                    placeholder='example@example.co.uk'
                                    value={loginData.email}
                                    onChange={update}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='registerName'>Password:</label>
                                <div className='input-password'>
                                    <input
                                        type={passwordVisibility ? 'text' : 'password'}
                                        className='form-control'
                                        id='password'
                                        name='password'
                                        checked={loginData.password}
                                        onChange={update}
                                        required
                                    />
                                    <button
                                        type='button'
                                        className="btn btn-outline-secondary password-button"
                                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                                    >
                                    {passwordVisibility ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {errors.password && 
                                (
                                    <span style={styles.error}>{errors.password}</span>
                                )}
                            </div>
                            <div className='mb-3' style={{ width: '100%', marginLeft: '100px' }}>
                                <label htmlFor="rememberMe" className='registerName mb-0 me-2'>Remember Me:</label>
                                <input 
                                    type='checkbox'
                                    className='form-check-input'
                                    id='rememberMe'
                                    name='rememberMe'
                                    checked={loginData.rememberMe}
                                    onChange={update}
                                />
                            </div>
                            <div className='text-center '>
                                <button type="submit" className="btn btn-primary btn-outline-secondary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
// styling for error and success messages
const styles =
{
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
    success:
    {
        color: "green",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
}

export default LoginPage