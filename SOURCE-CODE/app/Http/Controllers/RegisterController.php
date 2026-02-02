<?php
// controller for registering a new user
// ensured that data follows models prerequisites
// then creates the user in the db

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\RegisterUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    // function to register a new user
    public function store(Request $request)
    {
        // making sure incoming data is valid
        $request->validate
        ([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:app_users,email',
            'password' => 'required|string|max:255',
            'phoneNumber' => 'required|digits:11|unique:app_users,phoneNumber',
            'allergies' => 'in:yes,no',
            'allergyInfo' => 'nullable|string',
        ]);
        // creating new user 
        $user = RegisterUser::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hashing password before being sent to the db
            'phoneNumber' => $request->phoneNumber,
            'allergies' => $request->allergies,
            'allergyInfo' => $request->allergyInfo,
        ]);
        
        // if the user was successfully created then redirect
        if ($user) 
        {
            return redirect('/loginUser')->with('success', 'Your account has been created successfully, please log in.');
        }
    }
}