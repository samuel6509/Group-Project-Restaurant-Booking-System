<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder1 extends Seeder
{
    /** //
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        // dummy entry to be changed at later date
        DB::table('app_admins')->insert([
            'name' => 'admin',
            'username' => 'admin',
            'password' => Hash::make('123'), // bycrypt password
            'email' => 'admin@admin.co.uk',
            'phoneNumber' => '11111111111',
        ]);
        // super admin login
        DB::table('app_admins')->insert([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('123'), // Hash the password
            'email' => 'admin@example.com',
            'phoneNumber' => '11111111112',
        ]);

        $this->command->info('Admin users seeded successfully!');
    }
}
