<?php

use App\Support\Enums\ProductProblemStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('product_problems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('returned_product_id')->constrained();
            $table->foreignId('component_id')->constrained();
            $table->enum('status', ProductProblemStatusEnum::toArray())->default(ProductProblemStatusEnum::DRAFT);
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
        if (app()->isLocal()) {
            Artisan::call('db:seed', ['--class' => 'ProductProblemSeeder']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('product_problems');
    }
};
