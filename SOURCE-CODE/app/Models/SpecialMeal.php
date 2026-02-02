<?php
//made by lj330
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialMeal extends Model
{
    use HasFactory; // Include the HasFactory trait for factory methods

    // The table associated with the model.
    protected $table = 'special_meals';

    // The attributes that are mass assignable.
    protected $fillable = [
        'image_url',
        'food_name',
        'food_description',
        'price',
    ];

    // Timestamp columns are automatically managed by Eloquent
    public $timestamps = false;

    // Eloquent is Laravel's built-in ORM (Object-Relational Mapping) system. 
    // It allows you to interact with the database using PHP classes instead of writing SQL queries. 
    // Each model represents a database table, and you can use methods to create, read, update, and delete records easily.

}
