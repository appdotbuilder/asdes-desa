import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { 
    FileText, 
    CheckCircle, 
    Clock, 
    AlertTriangle,
    Plus,
    Eye,
    Calendar,
    BarChart3,
    TrendingUp,
    Newspaper
} from 'lucide-react';

interface Props {
    stats: {
        totalMyReports: number;
        completedReports: number;
        pendingReports: number;
        inProgressReports: number;
    };
    charts: {
        myReportsByStatus: Record<string, number>;
        myReportsByCategory: Array<{ name: string; total: number }>;
    };
    myRecentReports: Array<{
        id: number;
        title: string;
        status: string;
        priority: string;
        created_at: string;
        category: { name: string };
    }>;
    latestBlogPosts: Array<{
        id: number;
        title: string;
        excerpt: string;
        published_at: string;
        slug: string;
        author: { name: string };
    }>;
    [key: string]: unknown;
}

export default function WargaDashboard({ stats, charts, myRecentReports, latestBlogPosts }: Props) {
    const statusColors = {
        pending: 'bg-amber-100 text-amber-800 border-amber-200',
        in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
        completed: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
    };



    return (
        <AppShell>
            <Head title="Dashboard Warga" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">👋 Dashboard Saya</h1>
                        <p className="text-slate-600">Kelola laporan dan pantau perkembangan infrastruktur desa</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/reports/create"
                            className="inline-flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Buat Laporan</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Laporan</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalMyReports}</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                        <Link 
                            href="/reports"
                            className="text-sm text-teal-600 hover:text-teal-700 mt-2 flex items-center space-x-1"
                        >
                            <Eye className="w-4 h-4" />
                            <span>Lihat semua</span>
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Menunggu</p>
                                <p className="text-3xl font-bold text-amber-600">{stats.pendingReports}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Belum ditanggapi</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Sedang Ditangani</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.inProgressReports}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Dalam proses</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Selesai</p>
                                <p className="text-3xl font-bold text-green-600">{stats.completedReports}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Telah diselesaikan</p>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Reports by Status */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5 text-teal-600" />
                            <span>Laporan Saya by Status</span>
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(charts.myReportsByStatus).map(([status, count]) => {
                                const percentage = stats.totalMyReports > 0 ? (count / stats.totalMyReports) * 100 : 0;
                                
                                return (
                                    <div key={status} className="flex items-center justify-between">
                                        <span className="capitalize text-sm font-medium">
                                            {status.replace('_', ' ')}
                                        </span>
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

                    {/* My Reports by Category */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                            <span>Laporan by Kategori</span>
                        </h3>
                        <div className="space-y-3">
                            {charts.myReportsByCategory.map((category, index) => {
                                const percentage = stats.totalMyReports > 0 ? (category.total / stats.totalMyReports) * 100 : 0;
                                
                                return (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm font-medium truncate max-w-32">
                                            {category.name}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-24 bg-slate-200 rounded-full h-2">
                                                <div 
                                                    className="bg-amber-600 h-2 rounded-full" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-900 w-8 text-right">
                                                {category.total}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Reports */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-teal-600" />
                                <span>Laporan Terbaru Saya</span>
                            </h3>
                            <Link 
                                href="/reports"
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="p-6">
                            {myRecentReports.length > 0 ? (
                                <div className="space-y-4">
                                    {myRecentReports.map((report) => (
                                        <div key={report.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                                            <div className="flex-1 min-w-0">
                                                <Link 
                                                    href={`/reports/${report.id}`}
                                                    className="text-sm font-medium text-slate-900 hover:text-teal-600 truncate block"
                                                >
                                                    {report.title}
                                                </Link>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[report.status as keyof typeof statusColors]}`}>
                                                        {report.status.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {report.category.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1 mt-1">
                                                    <Calendar className="w-3 h-3 text-slate-400" />
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(report.created_at).toLocaleDateString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm mb-4">Belum ada laporan</p>
                                    <Link
                                        href="/reports/create"
                                        className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Buat Laporan Pertama</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Latest Blog Posts */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <Newspaper className="w-5 h-5 text-blue-600" />
                                <span>Berita Terbaru</span>
                            </h3>
                            <Link 
                                href="/blog"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="p-6">
                            {latestBlogPosts.length > 0 ? (
                                <div className="space-y-4">
                                    {latestBlogPosts.map((post) => (
                                        <div key={post.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                                            <Link 
                                                href={`/blog/${post.slug}`}
                                                className="text-sm font-medium text-slate-900 hover:text-blue-600 line-clamp-2"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                                                <span>Oleh {post.author.name}</span>
                                                <span>
                                                    {new Date(post.published_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm">Belum ada berita terbaru</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}