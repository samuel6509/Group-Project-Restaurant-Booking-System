<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    public function up(): void
    {
        Schema::create('app_admins', function (Blueprint $table) {
            $table->id('adminID'); // set the auto increament ID field explicitly as `adminID`; part of erd specs
            // $table->string('name'); //removed name field; not part of erd specification
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
}
