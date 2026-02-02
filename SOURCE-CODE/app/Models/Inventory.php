<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory'; 

    // Allow mass assignment for specific columns
    protected $fillable = [
        'image_url',
        'item_name',
        'quantity',
        'price',
        'category',
    ];
}
