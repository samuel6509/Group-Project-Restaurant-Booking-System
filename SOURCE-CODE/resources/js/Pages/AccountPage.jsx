// page to show the user all their info once logged in
import GenericLayout from "@/Layouts/GenericLayout"
import { usePage, useForm} from '@inertiajs/react'
import React, { useState } from "react"

const AccountPage = () => 
{
    const [emailError, setEmailError] = useState('') //error message for mismatched email
    const [phoneError, setPhoneError] = useState('') //error message for mismatched phone number 
    const {user, success} = usePage().props
    // gets data on the user from database / props and puts it onto the form
    const {data:formData, setData:setFormData, put, errors,} = useForm
    ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        confirmEmail: user.email,
        phoneNumber: user.phoneNumber,
        confirmPhoneNumber: user.phoneNumber,
        allergies: user.allergies,
        allergyInfo: user.allergyInfo,
    })

    //console.log(formData)
    //console.log(success)

    // handles updates to the form data
    const handleChange = (e) => 
    {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        //console.log(setFormData)
        //console.log(formData.allergies)
        //console.log(formData.allergyInfo)

        // get rid of the errors once either field is changed
        if (name === 'email' || name === 'confirmEmail') 
        {
            setEmailError('')
        }
        if (name === 'phoneNumber' || name === 'confirmPhoneNumber')
        {
            setPhoneError('')
        }
        // do not let user exeed 11 digits
        if (name === 'phoneNumber' || name === 'confirmPhoneNumber') 
        {
            if (value.length > 11) 
            {
                return;
            }
        }
    }
    // handles the submittion of the form
    const handleSubmit = (e) => 
    {
        e.preventDefault()

        // if emails do not match
        if(formData.email !== formData.confirmEmail)
        {
            setEmailError('Your emails do not match, Please try again.')
        }
        // if phone number do not match
        if(formData.phoneNumber !== formData.confirmPhoneNumber)
        {
            setPhoneError("Your phone numbers do not match, please try again")
        }
        put('/account/update', formData)
    }

    return (
        <GenericLayout>
            <div className = 'login-container'>
                <div className='login-box' style={{width:800}}>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Account Information:</h2>
                    <p className='registrationInfo'>You can change your email, phone number or your allergy info on this page.</p>
                    <p className='registrationInfo'>You can request a password change <a href="/password" className='link'>here</a>.</p>
                    <form onSubmit={handleSubmit} className='registrationForm'>
                        <div className='mb-3'>
                            {/* div containing a success message and error message  */}
                        <div style={{textAlign: "center"}}>
                            {success && 
                            (
                                <span style={styles.success}>{success}</span>
                            )}
                            {errors.update && 
                            (
                                <span style={styles.error}>{errors.update}</span>
                            )}
                            {/* div containing the first name field of the form, same logic is used for the rest
                                of the form */}
                        </div>
                            <label htmlFor="firstName" className='registerName'>First Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='firstName'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {/* error message for invalid first name, error message is sent from the controller
                                used quite abit in this page */}
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
                                value={formData.lastName}
                                onChange={handleChange}
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
                                type="email"
                                className='form-control'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && 
                            (
                                <span style={styles.error}>{errors.email}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmEmail" className='registerName'>Confirm Email:</label>
                            <input
                                type='email'
                                className='form-control'
                                id='confirmEmail'
                                name='confirmEmail'
                                value={formData.confirmEmail}
                                onChange={handleChange}
                                required
                            />
                            {emailError && 
                            (
                                <span style={styles.error}>{emailError}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phoneNumber" className='registerName'>Phone Number:</label>
                            <input
                                type="tel"
                                className='form-control'
                                id='phoneNumber'
                                name='phoneNumber'
                                pattern='[0-9]{11}'
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)}
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            {errors.phoneNumber && 
                            (
                                <span style={styles.error}>{errors.phoneNumber}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmPhoneNumber" className='registerName'>Confirm PhoneNumber:</label>
                            <input
                                type='tel'
                                className='form-control'
                                id='confirmPhoneNumber'
                                name='confirmPhoneNumber'
                                pattern='[0-9]{11}'
                                // only allows numbers and no more than 11 digits
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)}
                                value={formData.confirmPhoneNumber}
                                onChange={handleChange}
                                required
                            />
                            {phoneError && 
                            (
                                <span style={styles.error}>{phoneError}</span>
                            )}
                        </div>
                        <div className='mb-5 text-center'>
                            <label htmlFor="allergies" className='registerName me-2'>Do you have allergies?</label>
                            <select
                                className='form-select d-inline-block w-auto'
                                id='allergies'
                                name='allergies'
                                value={formData.allergies}
                                onChange={handleChange}
                                required
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        {/* if allergies is yes a text box appears so user can fill out allergies */}
                        {formData.allergies === 'yes' && (
                            <div className='mb-5 text-center'>
                                <div>
                                    <label htmlFor="allergyInfo" className='registerName mb-2'>List your allergies here:</label>
                                </div>
                                <textarea
                                    className='form-control d-inline-block'
                                    id='allergyInfo'
                                    name='allergyInfo'
                                    placeholder='for example... nuts, dairy, gluten'
                                    value={formData.allergyInfo}
                                    onChange={handleChange}
                                    rows="5"
                                    style={{minHeight: '200px'}}
                                />
                                {errors.allergyInfo && 
                                (
                                    <span style={styles.error}>{errors.allergyInfo}</span>
                                )}
                            </div>
                        )}
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary" style={{width:150, height:50}}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </GenericLayout>
    )
}
// stylomg for error and success messages
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

export default AccountPage;