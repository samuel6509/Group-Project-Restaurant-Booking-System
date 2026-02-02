<?php
// made by sw734
// model for Login Page

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class LoginUser extends Authenticatable
{
    protected $table = 'app_users'; // same db table as Register User
    protected $primaryKey = 'userID'; // used for keeping a user logged in, usually expects it to be just id

    protected $fillable =
    [
        'email',
        'password',
    ];
}

