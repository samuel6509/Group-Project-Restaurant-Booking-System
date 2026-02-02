<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;


class MemberController extends Controller

{
  
    public function index()
{
    $members = User::with('roles')->orderBy('id', 'desc')->paginate(10);
    $roles = Role::all();
    return inertia('Admin/ManageMembers', [
        'members' => $members,
        'roles' => $roles,
    ]);
}

   


public function update(Request $request, User $member)
{
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $member->id,
        'phoneNumber' => 'nullable|string|max:20',
        'role' => 'required|exists:roles,id', 
        'allergies' => 'nullable|boolean',
        'allergyInfo' => 'nullable|string|max:255',
    ]);

    $member->update($validated);


    $role = Role::findById($validated['role']);
    $member->syncRoles([$role]);

   return redirect()
        ->route('admin.members.index') 
        ->with('success', 'Member updated successfully.');
}




   
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.members.index')->with('success', 'Member deleted successfully.');
    }
}
