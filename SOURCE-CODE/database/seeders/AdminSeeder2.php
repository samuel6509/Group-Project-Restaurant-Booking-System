<?php
// seeder for users table for super admin 
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder2 extends Seeder
{
    /** //
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        // dummy entry to be changed at later date
        DB::table('users')->insert
        ([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('123'), // Hash the password
        ]);

        $this->command->info('Admin user seeded successfully!');
    }
}