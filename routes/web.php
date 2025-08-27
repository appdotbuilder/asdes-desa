<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Blog routes (public access for reading)
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');

// Map routes (public access)
Route::get('/map', [MapController::class, 'index'])->name('map.index');
Route::get('/map/report/{report}', [MapController::class, 'show'])->name('map.show');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Reports - full resource routes
    Route::resource('reports', ReportController::class);
    
    // Blog management (admin only)
    Route::middleware('auth')->group(function () {
        Route::get('/blog/create', [BlogController::class, 'create'])->name('blog.create');
        Route::post('/blog', [BlogController::class, 'store'])->name('blog.store');
        Route::get('/blog/{blogPost:slug}/edit', [BlogController::class, 'edit'])->name('blog.edit');
        Route::patch('/blog/{blogPost:slug}', [BlogController::class, 'update'])->name('blog.update');
        Route::delete('/blog/{blogPost:slug}', [BlogController::class, 'destroy'])->name('blog.destroy');
    });
    
    // Comments
    Route::post('/comments/{type}/{id}', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';