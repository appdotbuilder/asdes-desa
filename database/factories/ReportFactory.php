<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Jalan Berlubang di Depan SD',
            'Lampu Jalan Mati',
            'Saluran Air Tersumbat',
            'Jembatan Kayu Rusak',
            'Pipa Air Bocor',
            'Drainase Meluap',
            'Fasilitas Toilet Umum Rusak',
            'Tempat Sampah Penuh',
            'Pohon Tumbang Menutupi Jalan',
            'Genangan Air di Jalan Utama'
        ];

        return [
            'title' => fake()->randomElement($titles),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->streetAddress() . ', Desa ' . fake()->city(),
            'latitude' => fake()->latitude(-8.5, -8.0), // Around Central Java
            'longitude' => fake()->longitude(110.0, 111.0),
            'category_id' => Category::factory(),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'critical']),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'rejected']),
            'user_id' => User::factory(),
            'reporter_name' => fake()->name(),
            'reporter_phone' => fake()->phoneNumber(),
            'reporter_email' => fake()->email(),
            'attachments' => null,
            'admin_notes' => fake()->boolean(30) ? fake()->sentence() : null,
            'responded_at' => fake()->boolean(40) ? fake()->dateTimeThisYear() : null,
            'responded_by' => fake()->boolean(40) ? User::factory()->state(['role' => 'admin']) : null,
        ];
    }

    /**
     * Indicate that the report is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'admin_notes' => null,
            'responded_at' => null,
            'responded_by' => null,
        ]);
    }

    /**
     * Indicate that the report is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'admin_notes' => 'Masalah telah diperbaiki dengan baik.',
            'responded_at' => fake()->dateTimeThisMonth(),
        ]);
    }
}