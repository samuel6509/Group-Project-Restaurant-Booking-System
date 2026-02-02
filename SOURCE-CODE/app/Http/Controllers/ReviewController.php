<?php
// made by sw734
// controller made to pick 3 reviews from db at random
// sends these reviews to the home page so they can be displayed there

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function pickReviews()
    {
        // select 3 random reviews from the reviews db table
        $reviews = Review::inRandomOrder()->take(3)->get();

        // return the reviews to page in JSON format
        return response()->json(['reviews' => $reviews]);
    }

    // function that submits a new review to the db
    public function SubmitReview(Request $request)
    {
        // make sure data is valid
        $request->validate
        ([
            'name' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|between:1,5',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:51200', // now handles image upload 
        ]);
        // if there is an image then send it to correct directory then send image path to the db
        $imagePath = null;
        if($request->hasFile('image'))
        {
            // stores in storage/app/public/reviews
            $path = $request->file('image')->store('reviews', 'public');
            $imagePath = 'storage/' . $path;
        }
        // send data to db
        Review::create([
            'name' => $request->name,
            'occupation' => $request->occupation,
            'content' => $request->content,
            'rating' => $request->rating,
            'image' => $imagePath,
        ]);
        // return to home page
        return Inertia::location('/home');
    }
}