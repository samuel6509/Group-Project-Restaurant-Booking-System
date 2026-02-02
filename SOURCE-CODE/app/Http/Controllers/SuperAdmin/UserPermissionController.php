<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{

    public function index()
    {
        $users = User::with('permissions')->get();
        $permissions = Permission::all(); 
        return inertia('SuperAdmin/UsersPermission', [
            'users' => $users,
            'permissions' => $permissions,
        ]);
    }

    public function assignPermission(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $user = User::findOrFail($validated['user_id']);
        $permission = Permission::findOrFail($validated['permission_id']);

        $user->givePermissionTo($permission);
        return redirect()->back()->with('success', 'Permission assigned successfully!');
    }
      public function revokePermission(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $user = User::findOrFail($request->user_id);

        
        $user->revokePermissionTo($request->permission_id);

        return redirect()->back()->with('success', 'Permission revoked successfully!');
    }
}