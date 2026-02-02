// page where user can reset their password
import GenericLayout from "@/Layouts/GenericLayout"
import { usePage, useForm} from '@inertiajs/react'
import React, { useState } from "react"

const ChangePasswordPage = ({}) =>
{
    const [passwordVisibility, setPasswordVisibility] = useState(false) // controls password visibility 
    // form starts off as empty 
    const {data:registerData, setData:setRegisterData, put, errors} = useForm
    ({
        // default state of registration form
        currentPassword: '',
        newPassword: '',
        newPassword_confirmation: '',
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
    }

    // sends the form to the db by PUT
    const submit = (event) =>
    {
        event.preventDefault()
        put('/password/change', registerData,)
    }

    return (
        <GenericLayout>
            <div className = 'login-container'>
                <div className='login-box' style={{width:600}}>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Change Password:</h2>
                    <p className='registrationInfo'>Change your password here, you will need to log back in upon change.</p>
                    <form onSubmit={submit} className='registrationForm'>
                        <div className='mb-3'>
                            <div style={{textAlign: "center"}}>
                                {errors.update && 
                                (
                                    <span style={styles.error}>{errors.update}</span>
                                )}
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <label htmlFor="currentPassword" className='registerName'>Current Password:</label>
                            </div>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='currentPassword'
                                name='currentPassword'
                                value={registerData.currentPassword}
                                onChange={update}
                                required
                            />
                            {/* error message for incorrect current password, used in this page alot */}
                            {errors.currentPassword && 
                            (
                                <span style={styles.error}>{errors.currentPassword}</span>
                            )}
                        </div>
                        {/* using bootstrap and inline css to change specifics of this classname element */}
                        <div className='d-flex align-items-center justify-content-center' style={{ width: '100%'}}>
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
                        <div className='mb-3'>
                            <label htmlFor="newPassword" className='registerName'>New Password:</label>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='newPassword'
                                name='newPassword'
                                data-testid='new-pass-input'
                                value={registerData.newPassword}
                                onChange={update}
                                required
                            />
                            {errors.newPassword && 
                            (
                                <span style={styles.error}>{errors.newPassword}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="newPassword_confirmation" className='registerName'>Confirm New Password:</label>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='newPassword_confirmation'
                                name='newPassword_confirmation'
                                value={registerData.newPassword_confirmation}
                                onChange={update}
                                required
                            />
                            {errors.newPassword_confirmation && 
                            (
                                <span style={styles.error}>{errors.newPassword_confirmation}</span>
                            )}
                        </div>
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </GenericLayout>
    )
}

const styles =
{
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    }
}

export default ChangePasswordPage