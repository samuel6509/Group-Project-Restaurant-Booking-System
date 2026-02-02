<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    use HasFactory;

    #Table associated with model
    protected $table = 'reservations';

    #Define attributes
    protected $fillable = [
        'name',
        'reservationDate',
        'reservationTime',
        'numGuests',
        'specialRequests',
        'phoneNumber',
        'email',
        'referenceCode',
    ];

    //Override the default column names
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public $timestamps = true;
}
