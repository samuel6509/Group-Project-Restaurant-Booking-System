<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->enum('type', ['starter', 'main', 'dessert', 'extra']);
            $table->text('description');
            $table->string('image_url');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('menu_items');
    }
};
