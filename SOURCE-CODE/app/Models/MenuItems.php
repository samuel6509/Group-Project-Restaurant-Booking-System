<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    // Dynamically set the table name
    protected $table;

    // The rows to get from the database
    protected $fillable = [
        'name',
        'price',
        'type',
        'description',
        'image_url',
        'category',
        'nutritional_info',
    ];

    // Ensures item price is a float
    protected $casts = [
        'price' => 'float',
    ];

    // Dynamically setting the table name
    public function setTableName($tableName)
    {
        $this->table = $tableName;
    }
}
