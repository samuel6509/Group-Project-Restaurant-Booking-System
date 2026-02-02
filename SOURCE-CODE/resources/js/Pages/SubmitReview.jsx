// created by sw734
// page for a user to submite a review
import React, { useState } from 'react';
import Layout from '../Layouts/GenericLayout'
import { useForm } from '@inertiajs/react'

const SubmitReview = () =>
{
    const [preview, setPreview] = useState(null) // change state of the review preview
    const {data:review, setData:setReview, post, errors} = useForm // default state of review
    ({
        name: '',
        occupation: '',
        content: '',
        rating: 0,
        image: null,
    })

    // handles the change of the star rating
    const handleStarRating = (starRating) =>
    {
        setReview({...review, rating: starRating})
    }

    // handles the change of any text field
    const handleTextChange = (e) =>
    {
        const{name, value} = e.target
        setReview({...review, [name]: value})
    }

    // function to handle submittion
    const submit = (event) =>
    {
        event.preventDefault()

        // sets the info to be sent to controller
        const data = new FormData()
        data.append('name', review.name)
        data.append('occupation', review.occupation)
        data.append('content', review.content)
        data.append('rating', review.rating)
        if(review.image)
        {
            data.append('image', review.image)
        }
        // the url expected for handling review being sent to db
        post('/post/submitReview', data,
        {
            headers:
            {
                'Content-Type': 'multipart/form-data',
            }
        })
        const message = 'Review submitted.'
        sessionStorage.setItem('ratingMessage', message)
    }

    return (
        <Layout>
            <section id = 'submitReview'>
            <div className='review-container'>
                <div className='review-box'>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Submit a Review:</h2>
                    <p className='registrationInfo'>Please feel free to make a review, tell us how we did & what we can do better.</p>
                    <p className='registrationInfo'>keep an eye out on the <a href="/home" className='link'>home page </a>as your review may be shown there.</p>

                    <form onSubmit={submit} className='registrationInfo'>
                        <div className='mb-3 text-left'>
                            <label htmlFor="image" className='registerName'>Upload your profile picture:</label>
                            <input 
                                type="file"
                                className='form-control'
                                id='image'
                                name='image'
                                accept='image/*'
                                onChange={(e) => 
                                {
                                    const file = e.target.files[0]
                                    setReview({...review, image: file})
                                    // temp URL so image is seen in preview 
                                    setPreview(URL.createObjectURL(file))
                                }}
                                />
                                {errors.image && 
                                (
                                    <span style={styles.error}>{errors.image}</span>
                                )}
                        </div>

                        <div className='mb-3 text-left'>
                            <label htmlFor="name" className='registerName'>Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='name'
                                name='name'
                                value={review.name}
                                onChange={handleTextChange}
                                required
                            />
                            {/* error message for invalid name taken from controller
                                this logic is used frequently in this page */}
                            {errors.name && 
                            (
                                <span style={styles.error}>{errors.name}</span>
                            )}
                        </div>
                        <div className='mb-3 text-left'>
                            <label htmlFor="occupation" className='registerName'>Occupation:</label>
                            <input 
                                type="text" 
                                className='form-control'
                                id='occupation'
                                name='occupation'
                                value={review.occupation}
                                onChange={handleTextChange}
                                placeholder='Guest for example...'
                                required
                            />
                            {errors.occupation && 
                            (
                                <span style={styles.error}>{errors.occupation}</span>
                            )}
                        </div>
                        <div className='mb-3 text-left'>
                            <label htmlFor="content" className='registerName'>Your review:</label>
                            <textarea
                                className='form-control d-inline-block'
                                id='content'
                                name='content'
                                value={review.content}
                                onChange={handleTextChange}
                                required
                                rows="5"
                                style={{ width: '100%', minHeight: '100px' }}
                            />
                            {errors.content && 
                            (
                                <span style={styles.error}>{errors.content}</span>
                            )}
                        </div>
                        <div className='mb-3 text-centre'>
                            <label htmlFor="rating" className='registerName'>Rating:</label>
                            <div className='starRating'>
                                {/* how the user can choose how many stars to give */}
                                {[1, 2, 3, 4, 5,].map((starRating) => (
                                <span
                                    key={starRating}
                                    className={review.rating >= starRating ? 'filled star' : 'star'}
                                    onClick={() => handleStarRating(starRating)}
                                >
                                ★
                                </span>
                                ))}
                            </div>
                            {errors.rating && 
                            (
                                <span style={styles.error}>{errors.rating}</span>
                            )}
                        </div>
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary">Publish Review</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* the review preview */}
            <div className='preview-container'>
                <div className='preview-box'>
                    <h2 className="display-12 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Your review:</h2>
                    {preview &&
                    (
                        <div className='user-image'>
                            <img src={preview} className="rounded-circle" width="80" alt="Preview"/>
                        </div>
                    )}
                    <h3 className='preview-text' style={{fontWeight: 'bold'}}>{review.name || 'Your Name:'}</h3>
                    <h3 className='preview-text' style={{fontSize: 'medium'}}>{review.occupation || 'Your Occupation:'}</h3>
                    <h3 className='preview-text' style={{fontSize: 'small'}}>{review.content || 'Your review:'}</h3>
                    <div className='starRating text-center'>
                        {[1, 2, 3, 4, 5,].map((starRating) => (
                        <span 
                            key={starRating}
                            style={{fontSize: 'large'}}
                            className={review.rating >= starRating ? 'filled star' : 'star'}
                        >
                        ★
                        </span>
                        ))}
                    </div>
                </div>
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

export default SubmitReview