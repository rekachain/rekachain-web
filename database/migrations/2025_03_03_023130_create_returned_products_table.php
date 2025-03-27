<?php

use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('returned_products', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('product_returnable', 'product_returnable');
            $table->foreignId('buyer_id')->nullable()->constrained('users');
            $table->integer('qty')->nullable()->default(1);
            $table->foreignId('serial_panel_id')->nullable()->constrained();
            $table->bigInteger('serial_number')->nullable();
            $table->enum('status', ReturnedProductStatusEnum::toArray())->default(ReturnedProductStatusEnum::DRAFT->value);
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
        // reseed aftersales division, permission and role
        Artisan::call('db:seed', ['--class' => 'DivisionSeeder']);
        Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);
        Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
        if (app()->isLocal()) {
            Artisan::call('db:seed', ['--class' => 'ReturnedProductSeeder']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('returned_products');
    }
};
