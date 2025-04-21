<?php

use App\Support\Enums\ProductRestockStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('product_restocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('returned_product_id')->constrained();
            $table->morphs('product_restockable', 'product_restockable');
            $table->foreignId('project_id')->nullable()->constrained();
            $table->enum('status', ProductRestockStatusEnum::toArray())->default(ProductRestockStatusEnum::DRAFT->value);
            $table->timestamps();
        });

        if (app()->isLocal()) {
            Artisan::call('db:seed', ['--class' => 'ProductRestockSeeder']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('product_restocks');
    }
};
