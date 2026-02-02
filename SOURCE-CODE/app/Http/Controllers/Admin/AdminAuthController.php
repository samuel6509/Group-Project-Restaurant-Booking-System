<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Admin;

class AdminAuthController extends Controller
{

    public function createAdmin(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:app_admins,username',
            'email' => 'required|email|unique:app_admins,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $admin = Admin::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Inertia::location('/admin');
    }
    public function showLoginForm()
    {
        return Inertia::render('Admin/Login'); // Admin Login React component
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            // dd(session()->all());

            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['username' => 'Invalid credentials.']);
    }

    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
}
