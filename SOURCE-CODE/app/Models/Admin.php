<?php
// made by sw734
// model for  Admin Login Page

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'app_admins';
    protected $primaryKey = 'adminID'; // used for keeping a user logged in, usually expects it to be just id

    protected $fillable =
    [
        'username',
        'password',
    ];
}