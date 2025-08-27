import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { 
    FileText, 
    Plus, 
    Search, 
    Filter,
    Eye,
    Calendar,
    MapPin,
    User,
    AlertTriangle,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react';

interface Report {
    id: number;
    title: string;
    description: string;
    location: string;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    priority: 'low' | 'medium' | 'high' | 'critical';
    created_at: string;
    category: {
        id: number;
        name: string;
        icon: string;
    };
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    reports: {
        data: Report[];
        links: Array<{ url?: string; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    categories: Array<{
        id: number;
        name: string;
        icon: string;
    }>;
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        category?: string;
    };
    auth: {
        user: {
            id: number;
            name: string;
            role: 'admin' | 'warga';
        };
    };
    [key: string]: unknown;
}

export default function ReportsIndex({ reports, categories, filters, auth }: Props) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = React.useState(filters.status || '');
    const [selectedPriority, setSelectedPriority] = React.useState(filters.priority || '');
    const [selectedCategory, setSelectedCategory] = React.useState(filters.category || '');

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

    const handleFilterChange = () => {
        router.get('/reports', {
            search: search || undefined,
            status: selectedStatus || undefined,
            priority: selectedPriority || undefined,
            category: selectedCategory || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedStatus('');
        setSelectedPriority('');
        setSelectedCategory('');
        router.get('/reports');
    };

    return (
        <AppShell>
            <Head title="Daftar Laporan" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            📋 {auth.user.role === 'admin' ? 'Semua Laporan' : 'Laporan Saya'}
                        </h1>
                        <p className="text-slate-600">
                            {auth.user.role === 'admin' 
                                ? 'Kelola laporan infrastruktur dari warga' 
                                : 'Pantau status laporan yang Anda ajukan'
                            }
                        </p>
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

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Cari Laporan
                            </label>
                            <div className="relative">
                                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan judul, deskripsi, atau lokasi..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Menunggu</option>
                                <option value="in_progress">Sedang Ditangani</option>
                                <option value="completed">Selesai</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Prioritas</label>
                            <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="">Semua Prioritas</option>
                                <option value="low">Rendah</option>
                                <option value="medium">Sedang</option>
                                <option value="high">Tinggi</option>
                                <option value="critical">Kritis</option>
                            </select>
                        </div>

                        <div className="lg:col-start-1 md:col-start-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-slate-200">
                        <div className="flex space-x-3">
                            <button
                                onClick={handleFilterChange}
                                className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Terapkan Filter</span>
                            </button>
                            {(search || selectedStatus || selectedPriority || selectedCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                >
                                    <span>Reset Filter</span>
                                </button>
                            )}
                        </div>
                        <div className="mt-3 sm:mt-0 text-sm text-slate-600">
                            Menampilkan {reports.data.length} dari {reports.meta.total} laporan
                        </div>
                    </div>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reports.data.map((report) => {
                        const StatusIcon = statusIcons[report.status];
                        
                        return (
                            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                                            {report.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 ml-3">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {report.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                        {report.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="truncate">{report.location}</span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-2 text-slate-600">
                                                <FileText className="w-4 h-4 text-slate-400" />
                                                <span>{report.category.name}</span>
                                            </div>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[report.priority]}`}>
                                                {report.priority}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-slate-500">
                                            {auth.user.role === 'admin' && (
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{report.user.name}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/reports/${report.id}`}
                                            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Lihat Detail</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {reports.data.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                        <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {(search || selectedStatus || selectedPriority || selectedCategory) 
                                ? 'Tidak ada laporan yang sesuai dengan filter' 
                                : 'Belum ada laporan'
                            }
                        </h3>
                        <p className="text-slate-600 mb-6">
                            {(search || selectedStatus || selectedPriority || selectedCategory) 
                                ? 'Coba ubah filter pencarian atau buat laporan baru.' 
                                : 'Mulai dengan membuat laporan infrastruktur pertama Anda.'
                            }
                        </p>
                        <Link
                            href="/reports/create"
                            className="inline-flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Buat Laporan</span>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {reports.meta.last_page > 1 && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-700">
                                Halaman {reports.meta.current_page} dari {reports.meta.last_page}
                            </div>
                            <div className="flex space-x-1">
                                {reports.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                            link.active 
                                                ? 'bg-teal-600 text-white' 
                                                : link.url 
                                                    ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300' 
                                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}