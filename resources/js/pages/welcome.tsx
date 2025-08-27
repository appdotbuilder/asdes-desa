import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    MapPin, 
    FileText, 
    Users, 
    BarChart3, 
    Shield, 
    MessageCircle,
    CheckCircle,
    Clock,
    AlertTriangle,
    ArrowRight,
    Mail,
    Phone
} from 'lucide-react';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: 'admin' | 'warga';
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Asdes - Aspirasi Desa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700|nunito:400,500,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-slate-50 font-['Inter']">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900 font-['Nunito']">Asdes</h1>
                                    <p className="text-sm text-slate-600">Aspirasi Desa</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-slate-700">
                                            Halo, {auth.user.name}
                                        </span>
                                        <Link
                                            href="/dashboard"
                                            className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/login"
                                            className="text-teal-800 font-medium hover:text-teal-700 transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                                    <FileText className="w-10 h-10" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Nunito']">
                                🏘️ Platform E-Government
                                <br />
                                <span className="text-emerald-300">Aspirasi Desa</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto leading-relaxed">
                                Mempermudah masyarakat melaporkan masalah infrastruktur desa secara online. 
                                Tingkatkan transparansi dan partisipasi warga dalam pembangunan desa! 🚀
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {auth.user ? (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="/reports/create"
                                            className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                                        >
                                            <FileText className="w-6 h-6" />
                                            <span>📝 Buat Laporan</span>
                                        </Link>
                                        <Link
                                            href="/map"
                                            className="bg-white text-teal-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                                        >
                                            <MapPin className="w-6 h-6" />
                                            <span>🗺️ Lihat Peta</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="/register"
                                            className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                                        >
                                            <Users className="w-6 h-6" />
                                            <span>🚀 Mulai Sekarang</span>
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="bg-white text-teal-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                                        >
                                            <span>👋 Sudah Punya Akun</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Nunito']">
                                ✨ Fitur Unggulan Platform
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Solusi lengkap untuk pengelolaan aspirasi dan pengaduan infrastruktur desa
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                    <FileText className="w-8 h-8 text-teal-800" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">📝 Laporan Online</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Ajukan laporan infrastruktur dengan mudah. Lengkapi dengan lokasi, foto, dan tingkat prioritas untuk penanganan yang lebih efektif.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                                    <MapPin className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">🗺️ Peta Interaktif</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Visualisasi semua laporan dalam peta desa. Lihat sebaran masalah infrastruktur dan status penanganannya secara real-time.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                    <BarChart3 className="w-8 h-8 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">📊 Dashboard Analitik</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Monitor statistik laporan dengan grafik yang mudah dipahami. Lihat tren dan prioritas pembangunan desa.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <MessageCircle className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">💬 Blog & Berita</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Ikuti perkembangan terbaru desa melalui artikel dan pengumuman. Warga dapat berkomentar dan berinteraksi.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <Shield className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">🛡️ Tracking Status</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Lacak perkembangan laporan Anda dari pending hingga selesai. Dapatkan notifikasi update dari admin desa.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8 text-rose-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">👥 Partisipasi Warga</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Platform yang menguatkan partisipasi masyarakat dalam pembangunan desa dengan transparansi penuh.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Status Flow Section */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Nunito']">
                                🔄 Alur Penanganan Laporan
                            </h2>
                            <p className="text-xl text-slate-600">
                                Dari pengaduan hingga penyelesaian dengan transparansi penuh
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Clock className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">⏳ Menunggu</h3>
                                <p className="text-slate-600">Laporan baru menunggu review dari admin desa</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <AlertTriangle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">🔧 Sedang Ditangani</h3>
                                <p className="text-slate-600">Tim sedang menangani masalah sesuai prioritas</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">✅ Selesai</h3>
                                <p className="text-slate-600">Masalah telah diselesaikan dengan baik</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Shield className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">❌ Ditolak</h3>
                                <p className="text-slate-600">Laporan tidak dapat diproses dengan alasan tertentu</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-teal-800 to-teal-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Nunito']">
                            🚀 Bergabung dengan Asdes Sekarang!
                        </h2>
                        <p className="text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
                            Mari bersama-sama membangun desa yang lebih baik melalui partisipasi aktif dan transparansi penuh
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center space-x-2"
                                >
                                    <Users className="w-6 h-6" />
                                    <span>Daftar Gratis</span>
                                </Link>
                                <Link
                                    href="/blog"
                                    className="bg-white bg-opacity-20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-30 transition-all inline-flex items-center justify-center space-x-2"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Lihat Berita Desa</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Asdes</h3>
                                </div>
                                <p className="text-slate-400">
                                    Platform E-Government untuk aspirasi dan pengaduan infrastruktur desa. 
                                    Membangun desa yang lebih baik bersama-sama.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Fitur Utama</h4>
                                <ul className="space-y-2">
                                    <li><Link href="/reports" className="hover:text-teal-400 transition-colors">📝 Laporan Online</Link></li>
                                    <li><Link href="/map" className="hover:text-teal-400 transition-colors">🗺️ Peta Infrastruktur</Link></li>
                                    <li><Link href="/blog" className="hover:text-teal-400 transition-colors">📰 Blog & Berita</Link></li>
                                    <li><Link href="/dashboard" className="hover:text-teal-400 transition-colors">📊 Dashboard</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4" />
                                        <span>admin@desaku.go.id</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4" />
                                        <span>(021) 1234-5678</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Kantor Desa, Indonesia</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
                            <p className="text-slate-400">
                                © 2024 Asdes (Aspirasi Desa). Dibuat dengan ❤️ untuk kemajuan desa Indonesia.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}