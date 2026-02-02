<?php
//made by lj330

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory; // Include the HasFactory trait for factory methods

    protected $table = 'cart_items'; // This tells the model to use the cart_items table.
    protected $fillable = ['cart_id', 'item_id', 'menu_type', 'quantity', 'price', 'item_name', 'item_type', 'item_description', 'item_image_url']; // Fields that are mass-assignable

    
    public function cart()
    {
        return $this->belongsTo(Cart::class, 'cart_id'); //This defines a relationship where each cart item belongs to a specific cart.
    }
}
