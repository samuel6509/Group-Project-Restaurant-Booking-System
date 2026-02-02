<?php
//made by lj330

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory; // Include the HasFactory trait for factory methods

    protected $table = 'orders'; // Define the table name explicitly (if different from the default)

    // Specify the fillable fields for mass assignment protection
    protected $fillable = ['user_id', 'total_price', 'status', 'address', 'city', 'postcode'];

    // Define a relationship with the OrderItem model
    public function orderItems()
    {
        // This indicates that an Order has many OrderItems related by the 'order_id' foreign key
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}