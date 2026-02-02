<?php
// model to be used by the centralised menu controller

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    // dynamically set the table name
    protected $table;

    // the rows to get from the database
    protected $fillable = 
    [
        'itemName',
        'itemPrice',
        'itemType',
        'itemDescription',
        'nutritional_info',
        'itemImageURL',
    ];

    // ensures item price is float 
    protected $casts = 
    [
        'itemPrice' => 'float',
    ];

    // Dynamically setting the table name
    public function setTableName($tableName)
    {
        $this->table = $tableName;
    }
}