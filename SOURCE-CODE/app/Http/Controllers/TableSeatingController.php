<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TableSeating;
use Inertia\Inertia;

class TableSeatingController extends Controller
{

// Method to display a single menu item based on the selected menu type and item ID
    // Method to display a single table seating based on the selected category and table ID
public function showTableSeating($category, $tableId)
{
    // Validate category
    $this->inArray($category);

    $tableSeating = new TableSeating(); // Assuming a TableSeating model exists

    // Fetch the selected table seating using its ID
    $table = $tableSeating->where('id', $tableId)->firstOrFail();

    // Return the table seating details to the frontend (React or Blade)
    return Inertia::render('TableSeating', ['table' => $table]);
}

}