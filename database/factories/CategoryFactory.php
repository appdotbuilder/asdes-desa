<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Jalan dan Jembatan', 'icon' => 'road', 'description' => 'Masalah terkait kondisi jalan, jembatan, dan akses transportasi'],
            ['name' => 'Air Bersih', 'icon' => 'droplet', 'description' => 'Masalah ketersediaan dan kualitas air bersih'],
            ['name' => 'Listrik', 'icon' => 'zap', 'description' => 'Gangguan listrik dan penerangan jalan'],
            ['name' => 'Drainase', 'icon' => 'waves', 'description' => 'Masalah saluran air dan sistem drainase'],
            ['name' => 'Fasilitas Umum', 'icon' => 'building-2', 'description' => 'Kerusakan fasilitas umum dan ruang publik'],
            ['name' => 'Lingkungan', 'icon' => 'leaf', 'description' => 'Masalah kebersihan dan pengelolaan sampah'],
        ];

        static $index = 0;
        $category = $categories[$index % count($categories)];
        $index++;

        return [
            'name' => $category['name'],
            'slug' => Str::slug($category['name']),
            'icon' => $category['icon'],
            'description' => $category['description'],
            'is_active' => true,
        ];
    }
}