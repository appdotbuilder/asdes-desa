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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Report title');
            $table->text('description')->comment('Problem description');
            $table->string('location')->comment('Location description');
            $table->decimal('latitude', 10, 8)->nullable()->comment('GPS latitude');
            $table->decimal('longitude', 11, 8)->nullable()->comment('GPS longitude');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium')->comment('Priority level');
            $table->enum('status', ['pending', 'in_progress', 'completed', 'rejected'])->default('pending')->comment('Report status');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('reporter_name')->comment('Full name of reporter');
            $table->string('reporter_phone')->comment('Phone number of reporter');
            $table->string('reporter_email')->comment('Email address of reporter');
            $table->json('attachments')->nullable()->comment('File attachments (images/documents)');
            $table->text('admin_notes')->nullable()->comment('Admin notes/response');
            $table->timestamp('responded_at')->nullable()->comment('When admin responded');
            $table->foreignId('responded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index(['status', 'priority']);
            $table->index(['user_id', 'created_at']);
            $table->index(['category_id', 'status']);
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};