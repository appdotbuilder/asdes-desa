<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return app(AdminDashboardController::class)->index();
        } else {
            return app(WargaDashboardController::class)->index();
        }
    }
}