<?php

use App\Support\Enums\ProductProblemCauseEnum;
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
        Schema::table('product_problems', function (Blueprint $table) {
            $table->enum('cause', ProductProblemCauseEnum::toArray())->after('component_id')->default(ProductProblemCauseEnum::QUALITY)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_problems', function (Blueprint $table) {
            $table->dropColumn('cause');
        });
    }
};
