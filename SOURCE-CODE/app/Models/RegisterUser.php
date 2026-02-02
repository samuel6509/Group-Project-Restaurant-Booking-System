<?php
// model for registerUser page 
// sets up encryption of password 
// sets up data structure for conroller

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // used to seed db with dummy data
use Illuminate\Database\Eloquent\Model;

class RegisterUser extends Model
{
    use HasFactory;

    protected $table = 'app_users'; // db table being used 
    protected $fillable =
    [
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
        'allergies',
        'allergyInfo',
    ];

    protected $hidden = 
    [
        'password',
        'remember_token',
    ];
}