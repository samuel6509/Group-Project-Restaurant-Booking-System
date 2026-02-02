<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = ['itemName', 'itemPrice', 'itemDescription', 'itemImageURL', 'itemNutritionalInfo'];

    public function toppings()
    {
        return $this->hasMany(MenuItemTopping::class, 'itemID');
    }
}

