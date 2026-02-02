<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MorningMenu extends Model
{
    protected $table = 'morning_menu';
    protected $primaryKey = 'itemID';
    protected $fillable = [
        'itemName', 'itemPrice', 'itemType', 'itemDescription', 'itemImageURL'
    ];

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class, 'itemID_morning', 'itemID');
    }
}
