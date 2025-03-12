<?php

use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('returned_products', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('product_returnable', 'product_returnable');
            $table->foreignId('buyer_id')->nullable()->constrained('users');
            $table->integer('qty')->nullable()->default(1);
            $table->foreignId('serial_panel_id')->nullable()->constrained();
            $table->bigInteger('serial_number')->nullable()->unique();
            $table->enum('status', ReturnedProductStatusEnum::toArray())->default(ReturnedProductStatusEnum::DRAFT->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returned_products');
    }
};
