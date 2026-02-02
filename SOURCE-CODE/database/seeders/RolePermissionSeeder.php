<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        
        $superAdminRole = Role::create(['name' => 'Super Admin']);
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);

        
        $superAdmin = User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'), 
            'phoneNumber' => '1234567890',
            'allergies' => false,
            'allergyInfo' => null,
        ]);
        $superAdmin->assignRole($superAdminRole);

        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), 
            'phoneNumber' => '0987654321',
            'allergies' => true,
            'allergyInfo' => 'Peanuts',
        ]);
        $admin->assignRole($adminRole);

        $user = User::create([
            'first_name' => 'Regular',
            'last_name' => 'User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'), 
            'phoneNumber' => '1122334455',
            'allergies' => false,
            'allergyInfo' => null,
        ]);
        $user->assignRole($userRole);
    }
}
