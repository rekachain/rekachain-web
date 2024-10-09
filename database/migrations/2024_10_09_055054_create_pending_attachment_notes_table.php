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
        Schema::create('pending_attachment_notes', function (Blueprint $table) {
            $table->id();
            $table->text('note');
            $table->morphs('pending_attachment_noteable', 'pending_attachment_noteable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pending_attachment_notes');
    }
};
