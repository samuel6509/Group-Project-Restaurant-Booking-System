<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EveningMenu extends Model
{
    protected $table = 'evening_menu';
    protected $primaryKey = 'itemID';
    protected $fillable = [
        'itemName', 'itemPrice', 'itemType', 'itemDescription', 'itemImageURL'
    ];

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class, 'itemID_evening', 'itemID');
    }
}
