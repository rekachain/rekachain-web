<?php

use App\Models\Component;
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
        Schema::table('components', function (Blueprint $table) {
            if (! Schema::hasColumn('components', 'vendor_name')) {
                $table->string('vendor_name')->nullable();
            }
            if (! Schema::hasColumn('components', 'vendor_qty')) {
                $table->integer('vendor_qty')->nullable();
            }
        });
        if (app()->isLocal()) {
            Component::all()->each(function ($component) {
                $component->update([
                    'vendor_name' => \Faker\Factory::create('id_ID')->optional(0.3)->company,
                    'vendor_qty' => round(rand(50, 200) / 10) * 10,
                ]);
            });
            Component::whereNull('vendor_name')->get()->each(function ($component) {
                $component->update([
                    'vendor_name' => Component::whereNotNull('vendor_name')->inRandomOrder()->first()->vendor_name,
                ]);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('components', function (Blueprint $table) {
            if (Schema::hasColumn('components', 'vendor_name')) {
                $table->dropColumn('vendor_name');
            }
            if (Schema::hasColumn('components', 'vendor_qty')) {
                $table->dropColumn('vendor_qty');
            }
        });
    }
};
