
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface CapaianKinerja {
    id: number;
    tanggal_capaian: string;
    nilai_capaian: number;
    deskripsi: string;
    bukti_dukung?: string;
}

interface IndikatorKinerja {
    id: number;
    nama_indikator: string;
    target: string;
    satuan: string;
    sasaran_kinerja: {
        id: number;
        judul_sasaran: string;
        status: string;
    };
}

interface Props {
    capaianKinerja: CapaianKinerja[];
    indikatorKinerja: IndikatorKinerja;
}

export default function CapaianKinerjaIndex({ capaianKinerja, indikatorKinerja }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const totalCapaian = capaianKinerja.reduce((sum, capaian) => sum + capaian.nilai_capaian, 0);
    const avgCapaian = capaianKinerja.length > 0 ? totalCapaian / capaianKinerja.length : 0;

    return (
        <AppLayout>
            <Head title="Capaian Kinerja" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('indikator-kinerja.index', indikatorKinerja.sasaran_kinerja.id)}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Capaian Kinerja</h1>
                            <p className="text-gray-600">{indikatorKinerja.nama_indikator}</p>
                            <p className="text-sm text-gray-500">
                                Target: {indikatorKinerja.target} {indikatorKinerja.satuan}
                            </p>
                        </div>
                    </div>
                    {indikatorKinerja.sasaran_kinerja.status !== 'selesai' && (
                        <Link href={route('capaian-kinerja.create', indikatorKinerja.id)}>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Capaian
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">Total Capaian</h3>
                                <p className="text-3xl font-bold text-blue-600">
                                    {totalCapaian.toFixed(2)} {indikatorKinerja.satuan}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">Rata-rata</h3>
                                <p className="text-3xl font-bold text-green-600">
                                    {avgCapaian.toFixed(2)} {indikatorKinerja.satuan}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">Total Record</h3>
                                <p className="text-3xl font-bold text-purple-600">
                                    {capaianKinerja.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* List Capaian */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Capaian Kinerja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {capaianKinerja.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">Belum ada capaian kinerja yang dicatat.</p>
                                {indikatorKinerja.sasaran_kinerja.status !== 'selesai' && (
                                    <Link href={route('capaian-kinerja.create', indikatorKinerja.id)}>
                                        <Button>Tambah Capaian Pertama</Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {capaianKinerja.map((capaian) => (
                                    <Card key={capaian.id} className="border-l-4 border-l-green-500">
                                        <CardContent className="pt-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <h4 className="font-semibold text-lg">
                                                            {capaian.nilai_capaian} {indikatorKinerja.satuan}
                                                        </h4>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(capaian.tanggal_capaian)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700">{capaian.deskripsi}</p>
                                                    {capaian.bukti_dukung && (
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            Bukti: {capaian.bukti_dukung}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link href={route('capaian-kinerja.show', [indikatorKinerja.id, capaian.id])}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {indikatorKinerja.sasaran_kinerja.status !== 'selesai' && (
                                                        <>
                                                            <Link href={route('capaian-kinerja.edit', [indikatorKinerja.id, capaian.id])}>
                                                                <Button variant="outline" size="sm">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Apakah Anda yakin ingin menghapus capaian ini?')) {
                                                                        // Handle delete
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
