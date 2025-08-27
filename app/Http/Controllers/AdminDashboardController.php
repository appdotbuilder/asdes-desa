<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Overall statistics
        $totalReports = Report::count();
        $totalUsers = User::warga()->count();
        $totalCategories = Category::active()->count();
        $totalBlogPosts = BlogPost::published()->count();

        // Report statistics by status
        $reportsByStatus = Report::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        // Report statistics by priority
        $reportsByPriority = Report::select('priority', DB::raw('count(*) as total'))
            ->groupBy('priority')
            ->pluck('total', 'priority')
            ->toArray();

        // Report statistics by category
        $reportsByCategory = Report::with('category')
            ->select('category_id', DB::raw('count(*) as total'))
            ->groupBy('category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->category->name,
                    'total' => $item->getAttributes()['total'],
                ];
            });

        // Monthly report trends (last 6 months)
        $monthlyReports = Report::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('count(*) as total')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Recent reports
        $recentReports = Report::with(['category', 'user'])
            ->latest()
            ->limit(5)
            ->get();

        // Map data for chart
        $mapData = Report::select('latitude', 'longitude', 'title', 'status', 'priority', 'id')
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->with('category:id,name,icon')
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalReports' => $totalReports,
                'totalUsers' => $totalUsers,
                'totalCategories' => $totalCategories,
                'totalBlogPosts' => $totalBlogPosts,
            ],
            'charts' => [
                'reportsByStatus' => $reportsByStatus,
                'reportsByPriority' => $reportsByPriority,
                'reportsByCategory' => $reportsByCategory,
                'monthlyReports' => $monthlyReports,
            ],
            'recentReports' => $recentReports,
            'mapData' => $mapData,
        ]);
    }
}