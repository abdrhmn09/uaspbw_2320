
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    totalSasaran: number;
    sasaranDisetujui: number;
    sasaranMenunggu: number;
    bawahanMenungguPersetujuan: number;
}

interface ProgressCapaian {
    sasaran: string;
    progress: number;
}

interface PeriodePenilaian {
    id: number;
    tahun: number;
    semester?: number;
    status: string;
}

interface Pegawai {
    id: number;
    nama: string;
    nip: string;
    jabatan: {
        nama_jabatan: string;
    };
}

interface Props {
    stats: DashboardStats;
    progressCapaian: ProgressCapaian[];
    periodeAktif: PeriodePenilaian | null;
    pegawai: Pegawai | null;
}

export default function Dashboard({ stats, progressCapaian, periodeAktif, pegawai }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    {pegawai && (
                        <p className="text-gray-600">
                            Selamat datang, {pegawai.nama} - {pegawai.jabatan.nama_jabatan}
                        </p>
                    )}
                </div>

                {/* Statistik Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Sasaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalSasaran}</div>
                            <p className="text-xs text-gray-500">Sasaran kinerja yang dibuat</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sasaran Disetujui</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.sasaranDisetujui}</div>
                            <p className="text-xs text-gray-500">Telah disetujui atasan</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.sasaranMenunggu}</div>
                            <p className="text-xs text-gray-500">Sasaran yang diajukan</p>
                        </CardContent>
                    </Card>

                    {stats.bawahanMenungguPersetujuan > 0 && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Persetujuan Bawahan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">{stats.bawahanMenungguPersetujuan}</div>
                                <p className="text-xs text-gray-500">Menunggu persetujuan Anda</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Progress Capaian */}
                {periodeAktif && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Progress Capaian Kinerja</CardTitle>
                            <p className="text-sm text-gray-600">
                                Periode: {periodeAktif.tahun}
                                {periodeAktif.semester && ` Semester ${periodeAktif.semester}`}
                            </p>
                        </CardHeader>
                        <CardContent>
                            {progressCapaian.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">
                                    Belum ada progress capaian kinerja untuk periode ini.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {progressCapaian.map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">{item.sasaran}</span>
                                                <Badge variant="outline">
                                                    {item.progress.toFixed(1)}%
                                                </Badge>
                                            </div>
                                            <Progress value={item.progress} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Info Periode */}
                {!periodeAktif && (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-gray-500">
                                Tidak ada periode penilaian yang aktif saat ini.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
