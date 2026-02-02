<?php
//made by lj330

namespace App\Http\Controllers;

use App\Models\SpecialMeal; // Import the SpecialMeal model to interact with the special_meals table
use Illuminate\Http\Request;

class SpecialMealsController extends Controller
{
    // Function to get random special meals
    public function getSpecialMeals()
    {
        // Fetch 3 random special meals from the database
        $specialMeals = SpecialMeal::inRandomOrder()->take(3)->get();

        // Return the special meals to the view (in JSON format)
        return response()->json([
            'specialMeals' => $specialMeals // Return the fetched special meals
        ]);
    }
}