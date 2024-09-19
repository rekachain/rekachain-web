<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('panel_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('carriage_panel_id')->constrained();
            $table->foreignId('source_workstation_id')->references('id')->on('workstations')->constrained();
            $table->foreignId('destination_workstation_id')->references('id')->on('workstations')->constrained();
            $table->string('attachment_number')->nullable();
            $table->string('qr_code')->nullable()->unique();
            $table->string('qr_path')->nullable()->unique();
            $table->string('current_step')->nullable();
            $table->string('elapsed_time')->nullable();
            $table->string('status')->nullable();
            $table->foreignId('panel_attachment_id')->nullable()->constrained();
            $table->foreignId('supervisor_id')->nullable()->references('id')->on('users')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('panel_attachments');
    }
};
