<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    /**
     * Display the infrastructure map.
     */
    public function index(Request $request)
    {
        $query = Report::with(['category', 'user'])
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->when($request->category, function ($q, $category) {
                $q->where('category_id', $category);
            })
            ->when($request->status, function ($q, $status) {
                $q->where('status', $status);
            })
            ->when($request->priority, function ($q, $priority) {
                $q->where('priority', $priority);
            });

        $reports = $query->get()->map(function ($report) {
            return [
                'id' => $report->id,
                'title' => $report->title,
                'description' => substr($report->description, 0, 150) . '...',
                'location' => $report->location,
                'latitude' => (float) $report->latitude,
                'longitude' => (float) $report->longitude,
                'status' => $report->status,
                'priority' => $report->priority,
                'category' => [
                    'id' => $report->category->id,
                    'name' => $report->category->name,
                    'icon' => $report->category->icon,
                ],
                'created_at' => $report->created_at->format('Y-m-d'),
                'reporter_name' => auth()->user()?->isAdmin() ? $report->reporter_name : 'Warga',
            ];
        });

        return Inertia::render('map/index', [
            'reports' => $reports,
            'categories' => Category::active()->get(),
            'filters' => $request->only(['category', 'status', 'priority']),
        ]);
    }

    /**
     * Get report details for map popup.
     */
    public function show(Report $report)
    {
        $report->load(['category']);

        // Hide sensitive information for non-admin users
        if (!auth()->user()?->isAdmin()) {
            $report->makeHidden(['reporter_phone', 'reporter_email', 'admin_notes']);
        }

        return response()->json($report);
    }
}