<?php
//made by lj330

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory; // Include the HasFactory trait for factory methods

    protected $table = 'order_items'; // Define the table name 

    // Specify the fillable fields so we cqn protect against mass-assignment vulnerabilities
    protected $fillable = [
        'order_id', 'item_id', 'menu_type', 'quantity', 'price', 
        'item_name', 'item_type', 'item_description', 'item_image_url'
    ];

    // Define a relationship method to associate an OrderItem with its Order
    public function order()
    {
        // This indicates that an OrderItem belongs to an Order, with 'order_id' as the foreign key
        return $this->belongsTo(Order::class, 'order_id');
    }
}

