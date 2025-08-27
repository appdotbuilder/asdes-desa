import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { 
    BarChart3, 
    FileText, 
    Users, 
    Building2, 
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    XCircle
} from 'lucide-react';

interface Props {
    stats: {
        totalReports: number;
        totalUsers: number;
        totalCategories: number;
        totalBlogPosts: number;
    };
    charts: {
        reportsByStatus: Record<string, number>;
        reportsByPriority: Record<string, number>;
        reportsByCategory: Array<{ name: string; total: number }>;
        monthlyReports: Array<{ month: string; total: number }>;
    };
    recentReports: Array<{
        id: number;
        title: string;
        status: string;
        priority: string;
        created_at: string;
        category: { name: string };
        user: { name: string };
    }>;
    mapData: Array<{
        id: number;
        title: string;
        latitude: number;
        longitude: number;
        status: string;
        priority: string;
        category: { name: string; icon: string };
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, charts, recentReports }: Props) {
    const statusColors = {
        pending: 'bg-amber-100 text-amber-800 border-amber-200',
        in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
        completed: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
    };

    const priorityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800',
    };

    const statusIcons = {
        pending: Clock,
        in_progress: AlertTriangle,
        completed: CheckCircle,
        rejected: XCircle,
    };

    return (
        <AppShell>
            <Head title="Dashboard Admin" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">📊 Dashboard Admin</h1>
                    <p className="text-slate-600">Monitoring dan analisis laporan infrastruktur desa</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Laporan</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalReports}</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Semua laporan masuk</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Warga</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Pengguna terdaftar</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Kategori Aktif</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalCategories}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Jenis infrastruktur</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Artikel Blog</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalBlogPosts}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Konten terpublikasi</p>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Status Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5 text-teal-600" />
                            <span>Laporan by Status</span>
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(charts.reportsByStatus).map(([status, count]) => {
                                const Icon = statusIcons[status as keyof typeof statusIcons];
                                const percentage = stats.totalReports > 0 ? (count / stats.totalReports) * 100 : 0;
                                
                                return (
                                    <div key={status} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Icon className="w-4 h-4 text-slate-600" />
                                            <span className="capitalize text-sm font-medium">
                                                {status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-24 bg-slate-200 rounded-full h-2">
                                                <div 
                                                    className="bg-teal-600 h-2 rounded-full" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-900 w-8 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Priority Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                            <span>Laporan by Priority</span>
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(charts.reportsByPriority).map(([priority, count]) => {
                                const percentage = stats.totalReports > 0 ? (count / stats.totalReports) * 100 : 0;
                                
                                return (
                                    <div key={priority} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`} />
                                            <span className="capitalize text-sm font-medium">
                                                {priority}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-24 bg-slate-200 rounded-full h-2">
                                                <div 
                                                    className="bg-amber-600 h-2 rounded-full" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-900 w-8 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Recent Reports Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h3 className="text-lg font-semibold flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-teal-600" />
                            <span>Laporan Terbaru</span>
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Laporan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Pelapor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {recentReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-900 truncate max-w-xs">
                                                {report.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {report.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[report.status as keyof typeof statusColors]}`}>
                                                {report.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[report.priority as keyof typeof priorityColors]}`}>
                                                {report.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {report.user.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {new Date(report.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}