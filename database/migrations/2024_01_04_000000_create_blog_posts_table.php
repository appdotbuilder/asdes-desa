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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Blog post title');
            $table->string('slug')->unique()->comment('URL slug');
            $table->text('excerpt')->comment('Short description/excerpt');
            $table->longText('content')->comment('Full blog post content');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->boolean('is_published')->default(false)->comment('Publication status');
            $table->timestamp('published_at')->nullable()->comment('Publication date');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->json('tags')->nullable()->comment('Post tags');
            $table->integer('views_count')->default(0)->comment('View count');
            $table->timestamps();
            
            $table->index(['is_published', 'published_at']);
            $table->index(['author_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};