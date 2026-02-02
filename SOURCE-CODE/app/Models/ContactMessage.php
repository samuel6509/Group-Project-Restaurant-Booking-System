<?php
// model to be used by the contact message controller 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'contact_messages';

    // Define the attributes that are mass assignable
    protected $fillable = [
        'name', 
        'email', 
        'phone', 
        'topic', 
        'message', 
        'status'
    ];
}