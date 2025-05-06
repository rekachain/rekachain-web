<?php

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
        Schema::table('returned_products', function (Blueprint $table) {
            $table->string('project_name')->after('serial_number')->nullable();
            $table->string('trainset_name')->after('serial_number')->nullable();
            $table->string('carriage_type')->after('serial_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('returned_products', function (Blueprint $table) {
            $table->dropColumn('project_name');
            $table->dropColumn('trainset_name');
            $table->dropColumn('carriage_type');
        });
    }
};
