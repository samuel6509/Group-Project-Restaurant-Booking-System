<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockLevel extends Model
{
    protected $table = 'stock_level';
    protected $primaryKey = 'inventoryID';
    protected $fillable = [
        'itemID_morning', 'itemID_evening', 'itemID_kids',
        'ingredientName', 'ingredientInformation', 'quantity', 'reorderLevel'
    ];

    public function morningMenu()
    {
        return $this->belongsTo(MorningMenu::class, 'itemID_morning', 'itemID');
    }

    public function eveningMenu()
    {
        return $this->belongsTo(EveningMenu::class, 'itemID_evening', 'itemID');
    }

    public function kidsMenu()
    {
        return $this->belongsTo(KidsMenu::class, 'itemID_kids', 'itemID');
    }
}
