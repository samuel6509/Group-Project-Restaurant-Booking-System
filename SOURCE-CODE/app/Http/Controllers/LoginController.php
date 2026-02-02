<?php
// controller to login & logout user 
// also checks if user is logged in
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LoginUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    // function to login user
    public function login(Request $request)
    {
        // if already logged in tell the user
        if ($request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                'already' => 'You are already logged in.',
            ]);
        }
 
        $validated = $request->validate
        ([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // see if given email is in the db
        $user = LoginUser::where('email', $validated['email'])->first();

        // check password against hashed password that corresponds with the email
        if ($user && Hash::check($validated['password'], $user->password)) 
        {
            // if correct put userID in sessions user_id
            $request->session()->put('user_id', $user->userID);

            // if remember me is chosen then remember me
            if ($request->has('rememberMe') && $request->rememberMe) 
            {
                $request->session()->put('remember_me', true);
            }

            return Inertia::location('/home');
        }

        // if login fails send error message
        return back()->withErrors(
        [
            'password' => 'Invalid credentials, please try again.',
        ]);
    }

    // function to check if user is logged in
    public function loginCheck(Request $request)
    {
        // check if user is logged in
        $loggedIn = $request->session()->has('user_id');
        
        // check if remember me is checked
        $rememberMe = $request->session()->get('remember_me', false);

        // Return the login status
        return Inertia::render('LoginPage', 
        [
            'loggedIn' => $loggedIn,
            'rememberMe' => $rememberMe
        ]);
    }

    // function to logout user
    public function logout(Request $request)
    {
        // Clear the session data
        $request->session()->forget('user_id');
        $request->session()->forget('remember_me');
        
        // clear cookies
        $cookie = cookie()->forget('user_id');

        return redirect('/loginUser')->withCookie($cookie)->with('success', 'You are now logged out.');
    }

    // function to get all info on the logged in user 
    public function getUserInfo(Request $request)
    {
        // if user is not logged in
        if (!$request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                // renders this error message on login page
                'login' => 'Please login before trying to access your account.',
            ]);
        }

        $userID = $request->session()->get('user_id');
        // only get the data relelvent to the user
        $user = LoginUser::where('userID', $userID)
                         ->select('firstName', 'lastName', 'email', 'phoneNumber', 'allergies', 'allergyInfo')
                         ->first();
        return response()->json($user);    
    }

    // function for the user to update their information
    public function update(Request $request)
    {
        if (!$request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                'login' => 'Please login before trying to access your account.',
            ]);
        }

        $userID = $request->session()->get('user_id');
        $user = LoginUser::where('userID', $userID)->first();

        $validated = $request->validate
        ([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:app_users,email,' . $user->userID . ',userID',
            'phoneNumber' => 'required|digits:11|unique:app_users,phoneNumber,' . $user->userID . ',userID',
            'allergies' => 'required|in:yes,no',
            'allergyInfo' => 'nullable|string|max:255',
        ]);

        // removes allergy info if allergies is set to no
        if ($validated['allergies'] === 'no') 
        {
            $validated['allergyInfo'] = null;
        }
        //Log::info('Data to be updated:', $validated);

        // update() function not working so using this instead
        $user->firstName = $validated['firstName'];
        $user->lastName = $validated['lastName'];
        $user->email = $validated['email'];
        $user->phoneNumber = $validated['phoneNumber'];
        $user->allergies = $validated['allergies'];
        $user->allergyInfo = $validated['allergyInfo'] ?? null;

        // if user is updated
        $check = $user->save();
        if ($check) 
        {
            return redirect()->back()->with('success', 'Information was updated successfully.');
        } 
        else 
        {
            return redirect('/account')->withErrors
            ([
                'update' => 'Something went wrong, please try again.'
            ]);
        }
    }

    // function to change users password upon request
    public function updatePassword(Request $request)
    {
        if (!$request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                'login' => 'Please login before trying to access your account.',
            ]);
        }

        $userID = $request->session()->get('user_id');
        $user = LoginUser::where('userID', $userID)->first();

        $validated = $request->validate
        ([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|confirmed',
        ]);

        // if current password given by user doesn't match with db
        if (!Hash::check($validated['currentPassword'], $user->password)) 
        {
            return back()->withErrors
            ([
                'currentPassword' => 'The current password you entered is incorrect.',
            ]);
        }
        // update if passes validation
        $user->password = Hash::make($validated['newPassword']);

        if ($user->save()) 
        {
            $this->logout($request);
            return redirect('/loginUser')->with('success', 'Your password has been updated successfully, please log back in.');
        } 
        else 
        {
            return back()->withErrors
            ([
                'update' => 'Something went wrong while updating the password. Please try again.',
            ]);
        }
    }

    // function to render the account page
    public function accountPage(Request $request)
    {
        if (!$request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                'login' => 'Please login before trying to access your account.',
            ]);
        }
        // send the user data to the page on render
        $userID = $request->session()->get('user_id');
        $user = LoginUser::where('userID', $userID)->first();
        return Inertia::render('AccountPage', ['user' => $user]);
    }

    // function to load the password page only when logged in
    public function changePasswordPage(Request $request)
    {
        if (!$request->session()->has('user_id')) 
        {
            return redirect('/loginUser')->withErrors
            ([
                'login' => 'Please login before trying to access your account.',
            ]);
        }
        // send the user data to the page on render
        $userID = $request->session()->get('user_id');
        $user = LoginUser::where('userID', $userID)->first();
        return Inertia::render('ChangePasswordPage', ['user' => $user]);
    } 

    //This method gets all the userInfo of the logged in user, including the id.
    public function getUserInfoAll(Request $request)
    {
        $userID = $request->session()->get('user_id');
        // only get the data relelvent to the user
        $user = LoginUser::where('userID', $userID)
                         ->first();
        return response()->json($user);    
    }

    
}