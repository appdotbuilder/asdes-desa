<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Report;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WargaDashboardController extends Controller
{
    /**
     * Display the warga dashboard.
     */
    public function index()
    {
        $userId = auth()->id();

        // Personal statistics
        $totalMyReports = Report::where('user_id', $userId)->count();
        $completedReports = Report::where('user_id', $userId)->where('status', 'completed')->count();
        $pendingReports = Report::where('user_id', $userId)->where('status', 'pending')->count();
        $inProgressReports = Report::where('user_id', $userId)->where('status', 'in_progress')->count();

        // My reports by status
        $myReportsByStatus = Report::where('user_id', $userId)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        // My reports by category
        $myReportsByCategory = Report::where('user_id', $userId)
            ->with('category')
            ->select('category_id', DB::raw('count(*) as total'))
            ->groupBy('category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->category->name,
                    'total' => $item->getAttributes()['total'],
                ];
            });

        // My recent reports
        $myRecentReports = Report::where('user_id', $userId)
            ->with(['category'])
            ->latest()
            ->limit(5)
            ->get();

        // Latest blog posts
        $latestBlogPosts = BlogPost::published()
            ->with('author')
            ->latest('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('warga/dashboard', [
            'stats' => [
                'totalMyReports' => $totalMyReports,
                'completedReports' => $completedReports,
                'pendingReports' => $pendingReports,
                'inProgressReports' => $inProgressReports,
            ],
            'charts' => [
                'myReportsByStatus' => $myReportsByStatus,
                'myReportsByCategory' => $myReportsByCategory,
            ],
            'myRecentReports' => $myRecentReports,
            'latestBlogPosts' => $latestBlogPosts,
        ]);
    }
}