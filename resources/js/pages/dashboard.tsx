import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard" />
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}