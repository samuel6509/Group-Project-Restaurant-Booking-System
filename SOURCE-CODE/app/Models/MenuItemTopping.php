<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItemTopping extends Model
{
    use HasFactory;

    protected $fillable = ['itemID', 'toppingName', 'toppingPrice'];

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class, 'itemID');
    }
}

