<?php

use App\Models\ProductProblemNote;
use App\Models\ReturnedProductNote;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('returned_product_notes', function (Blueprint $table) {
            $table->enum('applied_status', ReturnedProductStatusEnum::toArray())->after('note');
        });
        Schema::table('product_problem_notes', function (Blueprint $table) {
            $table->enum('applied_status', ProductProblemStatusEnum::toArray())->after('note');
        });
        DB::beginTransaction();
        try {
            ReturnedProductNote::get()->each(function ($note) {
                $note->applied_status = $note->returned_product->status;
                $note->save();
            });
            ProductProblemNote::get()->each(function ($note) {
                $note->applied_status = $note->product_problem->status;
                $note->save();
            });
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('returned_product_notes', function (Blueprint $table) {
            if (Schema::hasColumn('returned_product_notes', 'applied_status')) {
                $table->dropColumn('applied_status');
            }
        });
        Schema::table('product_problem_notes', function (Blueprint $table) {
            if (Schema::hasColumn('product_problem_notes', 'applied_status')) {
                $table->dropColumn('applied_status');
            }
        });
    }
};
