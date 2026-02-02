<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KidsMenu extends Model
{
    protected $table = 'kids_menu';
    protected $primaryKey = 'itemID';
    protected $fillable = [
        'itemName', 'itemPrice', 'itemType', 'itemDescription', 'itemImageURL'
    ];

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class, 'itemID_kids', 'itemID');
    }
}
