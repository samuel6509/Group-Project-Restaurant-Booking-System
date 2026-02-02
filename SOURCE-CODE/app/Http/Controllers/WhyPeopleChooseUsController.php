<?php
//made by lj330


namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\WhyPeopleChooseUs; // Make sure to import the WhyPeopleChooseUs model

class WhyPeopleChooseUsController extends Controller
{
    /**
     * Fetch 3 random images from the why_people_choose_us table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCuisines()
    {
        // Fetch 3 random rows from the 'why_people_choose_us' table
        $cuisines = WhyPeopleChooseUs::inRandomOrder()->take(3)->get();

        // Return the cuisines data as a JSON response
        return response()->json(['cuisines' => $cuisines]);
    }
}