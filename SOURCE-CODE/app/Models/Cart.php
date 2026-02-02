<?php
//Made by lj330

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory; // Include the HasFactory trait for factory methods

    protected $table = 'carts'; // This here tells the model to use the carts table
    protected $fillable = ['user_id']; // This is used to allow mass assignment for user_id when creating or updating records.

    //This defines a relationship between the cart and its items. Each cart has many items, and we can use this relationship to easily fetch the items associated with a cart.
    public function items()
    {
        return $this->hasMany(CartItem::class, 'cart_id');
    }
}

