<?php

use App\Support\Enums\ProductProblemCauseEnum;
use App\Support\Enums\ProductProblemStatusEnum;
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
            $table->enum('status', ProductProblemStatusEnum::toArray())->default(ProductProblemStatusEnum::DRAFT)->change();
            $table->integer('qty')->after('component_id')->nullable()->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_problems', function (Blueprint $table) {
            $table->dropColumn('cause');
            $table->dropColumn('qty');
        });
    }
};
