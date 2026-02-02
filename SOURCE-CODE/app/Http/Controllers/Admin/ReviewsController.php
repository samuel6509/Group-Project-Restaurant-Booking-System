<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;


class ReviewsController extends Controller
{
   
    public function index()
    {
        $reviews = Review::latest()->paginate(10); 
      
        return inertia('Admin/ManageReviews', ['reviews' => $reviews]);
    }


    public function edit(Review $review)
    {
        return inertia('Admin/EditReview', ['review' => $review]);
    }

  
    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|between:1,5',
        ]);

        $review->update($validated);

        return redirect()->route('admin.reviews.index')->with('success', 'Review updated successfully.');
    }





    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.reviews.index')->with('success', 'Review deleted successfully.');
    }
}
