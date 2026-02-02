<?php



namespace Database\Seeders;



use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;



class AdminSeeder extends Seeder
{
/**
* Run the database seeds.
*/
public function run(): void
{
    User::create([
        'first_name' => 'Regular',
        'last_name' => 'User',
        'email' => 'superadmin@example.com',
        'password' => Hash::make('passwordadmin'),
        'phoneNumber' => '1122334455',
        'allergies' => false,
        'allergyInfo' => null,
        ]);
}
}