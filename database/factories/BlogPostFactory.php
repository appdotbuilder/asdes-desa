<?php

namespace Database\Factories;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8));
        $content = fake()->paragraphs(random_int(5, 10), true);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => $content,
            'featured_image' => null,
            'is_published' => fake()->boolean(80),
            'published_at' => fake()->boolean(80) ? fake()->dateTimeThisYear() : null,
            'author_id' => User::factory()->state(['role' => 'admin']),
            'tags' => fake()->randomElements(['pengumuman', 'pembangunan', 'infrastruktur', 'gotong-royong', 'kegiatan-desa'], random_int(1, 3)),
            'views_count' => fake()->numberBetween(0, 1000),
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => true,
            'published_at' => fake()->dateTimeThisYear(),
        ]);
    }
}