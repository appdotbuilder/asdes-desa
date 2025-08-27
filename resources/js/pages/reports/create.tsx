import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { FileText, MapPin, Upload, AlertCircle } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    icon: string;
    description: string;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CreateReport({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        latitude: '',
        longitude: '',
        category_id: '',
        priority: 'medium',
        reporter_name: '',
        reporter_phone: '',
        reporter_email: '',
        attachments: [] as File[],
    });

    const [isGettingLocation, setIsGettingLocation] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reports');
    };

    const getCurrentLocation = () => {
        setIsGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData({
                        ...data,
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    });
                    setIsGettingLocation(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsGettingLocation(false);
                    alert('Tidak dapat mengakses lokasi. Pastikan Anda mengizinkan akses lokasi.');
                }
            );
        } else {
            setIsGettingLocation(false);
            alert('Browser Anda tidak mendukung geolokasi.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setData('attachments', fileArray);
        }
    };

    return (
        <AppShell>
            <Head title="Buat Laporan Baru" />
            <div className="p-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-teal-600" />
                        <span>📝 Buat Laporan Baru</span>
                    </h1>
                    <p className="text-slate-600">
                        Laporkan masalah infrastruktur desa dengan detail yang lengkap
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-teal-600" />
                            <span>Informasi Laporan</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Judul Laporan *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Jalan berlubang di depan SD Negeri 1"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.title}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Kategori Infrastruktur *
                                </label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.category_id}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tingkat Prioritas *
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                >
                                    <option value="low">🟢 Rendah - Tidak mendesak</option>
                                    <option value="medium">🟡 Sedang - Perlu perhatian</option>
                                    <option value="high">🟠 Tinggi - Perlu segera ditangani</option>
                                    <option value="critical">🔴 Kritis - Sangat mendesak</option>
                                </select>
                                {errors.priority && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.priority}</span>
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Deskripsi Masalah *
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={5}
                                    placeholder="Jelaskan detail masalah infrastruktur yang Anda temukan..."
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.description}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-teal-600" />
                            <span>Lokasi</span>
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Alamat/Lokasi *
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Jl. Pendidikan No. 15, RT 01/RW 01"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.location}</span>
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        placeholder="-7.2575"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        placeholder="112.7521"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        disabled={isGettingLocation}
                                        className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium disabled:opacity-50"
                                    >
                                        {isGettingLocation ? (
                                            <span className="flex items-center justify-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
                                                <span>Mendapatkan...</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>Lokasi Saya</span>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500">
                                Koordinat GPS opsional, tapi membantu admin menemukan lokasi dengan tepat
                            </p>
                        </div>
                    </div>

                    {/* Reporter Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6">Informasi Pelapor</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama Lengkap *
                                </label>
                                <input
                                    type="text"
                                    value={data.reporter_name}
                                    onChange={(e) => setData('reporter_name', e.target.value)}
                                    placeholder="Nama lengkap pelapor"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                {errors.reporter_name && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.reporter_name}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nomor Telepon *
                                </label>
                                <input
                                    type="tel"
                                    value={data.reporter_phone}
                                    onChange={(e) => setData('reporter_phone', e.target.value)}
                                    placeholder="081234567890"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                {errors.reporter_phone && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.reporter_phone}</span>
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={data.reporter_email}
                                    onChange={(e) => setData('reporter_email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                {errors.reporter_email && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.reporter_email}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* File Attachments */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
                            <Upload className="w-5 h-5 text-teal-600" />
                            <span>Lampiran (Opsional)</span>
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Upload Foto atau Dokumen
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <p className="text-sm text-slate-500 mt-2">
                                Format yang didukung: JPG, PNG, PDF. Maksimal 2MB per file.
                            </p>
                            {data.attachments.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm font-medium text-slate-700 mb-2">File terpilih:</p>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        {Array.from(data.attachments).map((file, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <FileText className="w-4 h-4" />
                                                <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {errors.attachments && (
                                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.attachments}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Mengirim...</span>
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
                                    <span>Kirim Laporan</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}