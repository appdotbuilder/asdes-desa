<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AsdesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Administrator Desa',
            'email' => 'admin@asdes.local',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '081234567890',
            'address' => 'Kantor Desa',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample warga users
        $warga1 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
            'role' => 'warga',
            'phone' => '082345678901',
            'address' => 'Jl. Mawar No. 15, RT 02/RW 01',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $warga2 = User::create([
            'name' => 'Sari Wulandari',
            'email' => 'sari@example.com',
            'password' => Hash::make('password'),
            'role' => 'warga',
            'phone' => '083456789012',
            'address' => 'Jl. Melati No. 8, RT 03/RW 02',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create additional warga users
        User::factory()->count(15)->create(['role' => 'warga']);

        // Create categories
        $categories = [
            ['name' => 'Jalan dan Jembatan', 'icon' => 'road', 'description' => 'Masalah terkait kondisi jalan, jembatan, dan akses transportasi'],
            ['name' => 'Air Bersih', 'icon' => 'droplet', 'description' => 'Masalah ketersediaan dan kualitas air bersih'],
            ['name' => 'Listrik', 'icon' => 'zap', 'description' => 'Gangguan listrik dan penerangan jalan'],
            ['name' => 'Drainase', 'icon' => 'waves', 'description' => 'Masalah saluran air dan sistem drainase'],
            ['name' => 'Fasilitas Umum', 'icon' => 'building-2', 'description' => 'Kerusakan fasilitas umum dan ruang publik'],
            ['name' => 'Lingkungan', 'icon' => 'leaf', 'description' => 'Masalah kebersihan dan pengelolaan sampah'],
        ];

        foreach ($categories as $categoryData) {
            Category::create([
                'name' => $categoryData['name'],
                'slug' => \Illuminate\Support\Str::slug($categoryData['name']),
                'icon' => $categoryData['icon'],
                'description' => $categoryData['description'],
                'is_active' => true,
            ]);
        }

        // Create sample reports
        $reportData = [
            [
                'title' => 'Jalan Berlubang di Depan SD Negeri 1',
                'description' => 'Jalan di depan SD Negeri 1 mengalami kerusakan parah dengan banyak lubang yang membahayakan pengendara. Terutama saat musim hujan, lubang-lubang ini terisi air dan sangat berbahaya bagi anak-anak sekolah.',
                'location' => 'Jl. Pendidikan No. 15, RT 01/RW 01',
                'latitude' => -7.2575,
                'longitude' => 112.7521,
                'category_id' => 1,
                'priority' => 'high',
                'status' => 'pending',
                'user_id' => $warga1->id,
                'reporter_name' => $warga1->name,
                'reporter_phone' => $warga1->phone,
                'reporter_email' => $warga1->email,
            ],
            [
                'title' => 'Lampu Jalan Mati Total',
                'description' => 'Lampu penerangan jalan di area perumahan tidak menyala selama 3 hari terakhir. Kondisi ini membahayakan keamanan warga terutama pada malam hari.',
                'location' => 'Jl. Mawar Raya, RT 02/RW 01',
                'latitude' => -7.2580,
                'longitude' => 112.7525,
                'category_id' => 3,
                'priority' => 'medium',
                'status' => 'in_progress',
                'user_id' => $warga2->id,
                'reporter_name' => $warga2->name,
                'reporter_phone' => $warga2->phone,
                'reporter_email' => $warga2->email,
                'admin_notes' => 'Sudah dihubungi PLN, sedang dalam proses perbaikan.',
                'responded_at' => now()->subDays(1),
                'responded_by' => $admin->id,
            ],
            [
                'title' => 'Saluran Air Tersumbat Sampah',
                'description' => 'Drainase di area pasar tersumbat oleh sampah dan dedaunan. Saat hujan deras, air meluap dan menggenang di jalan.',
                'location' => 'Area Pasar Desa, RT 05/RW 03',
                'latitude' => -7.2585,
                'longitude' => 112.7530,
                'category_id' => 4,
                'priority' => 'medium',
                'status' => 'completed',
                'user_id' => $warga1->id,
                'reporter_name' => $warga1->name,
                'reporter_phone' => $warga1->phone,
                'reporter_email' => $warga1->email,
                'admin_notes' => 'Drainase telah dibersihkan dan diperbaiki. Terima kasih atas laporannya.',
                'responded_at' => now()->subDays(3),
                'responded_by' => $admin->id,
            ]
        ];

        foreach ($reportData as $data) {
            Report::create($data);
        }

        // Create additional random reports
        Report::factory()->count(25)->create();

        // Create blog posts
        $blogPosts = [
            [
                'title' => 'Gotong Royong Pembersihan Saluran Air Dimulai',
                'slug' => 'gotong-royong-pembersihan-saluran-air-dimulai',
                'excerpt' => 'Kegiatan gotong royong pembersihan saluran air akan dilaksanakan mulai hari Minggu untuk mencegah banjir di musim hujan.',
                'content' => 'Dalam rangka persiapan menghadapi musim hujan yang akan datang, Pemerintah Desa mengajak seluruh warga untuk bergotong royong membersihkan saluran air di seluruh wilayah desa. Kegiatan ini akan dilaksanakan pada hari Minggu, 15 Oktober 2023, mulai pukul 07.00 WIB. Warga diharapkan membawa peralatan seperti cangkul, sapu, dan karung sampah. Mari bersama-sama menjaga lingkungan desa kita agar terhindar dari bencana banjir.',
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'author_id' => $admin->id,
                'tags' => ['gotong-royong', 'drainase', 'lingkungan'],
            ],
            [
                'title' => 'Program Perbaikan Jalan Desa Tahun 2023',
                'slug' => 'program-perbaikan-jalan-desa-tahun-2023',
                'excerpt' => 'Pemerintah desa mengalokasikan anggaran khusus untuk perbaikan infrastruktur jalan yang rusak di berbagai titik.',
                'content' => 'Sesuai dengan rencana pembangunan desa tahun 2023, pemerintah desa telah mengalokasikan anggaran sebesar Rp 500 juta untuk program perbaikan jalan. Program ini akan fokus pada perbaikan jalan-jalan utama yang mengalami kerusakan parah, terutama di area sekolah dan fasilitas umum lainnya. Pelaksanaan akan dimulai pada bulan November 2023 dan diperkirakan selesai dalam 3 bulan.',
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'author_id' => $admin->id,
                'tags' => ['pembangunan', 'infrastruktur', 'jalan'],
            ],
            [
                'title' => 'Pemasangan Lampu Jalan LED Ramah Lingkungan',
                'slug' => 'pemasangan-lampu-jalan-led-ramah-lingkungan',
                'excerpt' => 'Desa akan mengganti seluruh lampu jalan dengan teknologi LED untuk menghemat energi dan meningkatkan penerangan.',
                'content' => 'Dalam upaya mendukung program green village, pemerintah desa akan mengganti seluruh lampu penerangan jalan dengan lampu LED yang lebih hemat energi. Program ini bekerja sama dengan PLN dan diharapkan dapat menghemat biaya listrik desa hingga 60%. Pemasangan akan dilakukan secara bertahap mulai dari jalan-jalan utama.',
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'author_id' => $admin->id,
                'tags' => ['pembangunan', 'listrik', 'ramah-lingkungan'],
            ]
        ];

        foreach ($blogPosts as $postData) {
            BlogPost::create($postData);
        }

        // Create additional blog posts
        BlogPost::factory()->count(10)->published()->create(['author_id' => $admin->id]);

        // Create comments for blog posts
        $blogPosts = BlogPost::all();
        foreach ($blogPosts as $post) {
            Comment::factory()->count(random_int(0, 5))->create([
                'commentable_type' => BlogPost::class,
                'commentable_id' => $post->id,
            ]);
        }

        // Create comments for some reports
        $reports = Report::limit(10)->get();
        foreach ($reports as $report) {
            if (random_int(1, 100) <= 30) { // 30% chance of having comments
                Comment::factory()->count(random_int(1, 3))->create([
                    'commentable_type' => Report::class,
                    'commentable_id' => $report->id,
                ]);
            }
        }
    }
}