<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Models\Category;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Report::with(['category', 'user'])
            ->when(auth()->user()->isWarga(), function ($q) {
                $q->where('user_id', auth()->id());
            })
            ->when($request->search, function ($q, $search) {
                $q->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhere('description', 'like', "%{$search}%")
                          ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($q, $status) {
                $q->where('status', $status);
            })
            ->when($request->priority, function ($q, $priority) {
                $q->where('priority', $priority);
            })
            ->when($request->category, function ($q, $category) {
                $q->where('category_id', $category);
            });

        $reports = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('reports/index', [
            'reports' => $reports,
            'categories' => Category::active()->get(),
            'filters' => $request->only(['search', 'status', 'priority', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reports/create', [
            'categories' => Category::active()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Handle file attachments if any
        if ($request->hasFile('attachments')) {
            $attachments = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('report-attachments', 'public');
                $attachments[] = $path;
            }
            $data['attachments'] = $attachments;
        }

        $report = Report::create($data);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Laporan berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        $report->load(['category', 'user', 'respondedBy', 'comments.user']);

        // Check authorization for warga users
        if (auth()->user()->isWarga() && $report->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('reports/show', [
            'report' => $report,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        // Only allow editing if report is still pending and user owns it
        if (auth()->user()->isWarga() && ($report->user_id !== auth()->id() || $report->status !== 'pending')) {
            abort(403);
        }

        return Inertia::render('reports/edit', [
            'report' => $report,
            'categories' => Category::active()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreReportRequest $request, Report $report)
    {
        // Only allow updating if report is still pending and user owns it
        if (auth()->user()->isWarga() && ($report->user_id !== auth()->id() || $report->status !== 'pending')) {
            abort(403);
        }

        $data = $request->validated();

        // Handle file attachments if any
        if ($request->hasFile('attachments')) {
            $attachments = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('report-attachments', 'public');
                $attachments[] = $path;
            }
            $data['attachments'] = $attachments;
        }

        $report->update($data);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Laporan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        // Only admin or report owner can delete
        if (auth()->user()->isWarga() && $report->user_id !== auth()->id()) {
            abort(403);
        }

        $report->delete();

        return redirect()->route('reports.index')
            ->with('success', 'Laporan berhasil dihapus.');
    }


}