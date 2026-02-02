<?php
// made by sw734
// model for ensuring the data in the reviews is what I expect
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    // adding so at a later data I can easily seed new reviews for testing pursposes
    use HasFactory;

    // table name & the primary key
    protected $table = 'reviews';
    protected $primaryKey = 'reviewID';

    // all the fillabel rows in the db table called reviews
    protected $fillable =
    [
        'name',
        'occupation',
        'content',
        'rating',
        'image',
    ];
}