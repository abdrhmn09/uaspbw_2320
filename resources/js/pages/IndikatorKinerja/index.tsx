
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface CapaianKinerja {
    id: number;
    tanggal_capaian: string;
    nilai_capaian: number;
}

interface IndikatorKinerja {
    id: number;
    nama_indikator: string;
    target: string;
    satuan: string;
    bobot: number;
    capaian_kinerja: CapaianKinerja[];
}

interface SasaranKinerja {
    id: number;
    judul_sasaran: string;
    status: string;
}

interface Props {
    indikatorKinerja: IndikatorKinerja[];
    sasaranKinerja: SasaranKinerja;
}

export default function IndikatorKinerjaIndex({ indikatorKinerja, sasaranKinerja }: Props) {
    const getAvgCapaian = (capaians: CapaianKinerja[]) => {
        if (capaians.length === 0) return 0;
        return capaians.reduce((sum, capaian) => sum + capaian.nilai_capaian, 0) / capaians.length;
    };

    return (
        <AppLayout>
            <Head title="Indikator Kinerja" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('skp.show', sasaranKinerja.id)}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke SKP
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Indikator Kinerja</h1>
                            <p className="text-gray-600">{sasaranKinerja.judul_sasaran}</p>
                        </div>
                    </div>
                    {sasaranKinerja.status === 'draft' && (
                        <Link href={route('indikator-kinerja.create', sasaranKinerja.id)}>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Indikator
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="grid gap-4">
                    {indikatorKinerja.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-500 mb-4">Belum ada indikator kinerja yang dibuat.</p>
                                {sasaranKinerja.status === 'draft' && (
                                    <Link href={route('indikator-kinerja.create', sasaranKinerja.id)}>
                                        <Button>Tambah Indikator Pertama</Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        indikatorKinerja.map((indikator) => {
                            const avgCapaian = getAvgCapaian(indikator.capaian_kinerja);

                            return (
                                <Card key={indikator.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{indikator.nama_indikator}</CardTitle>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Target: {indikator.target} {indikator.satuan}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Bobot: {indikator.bobot}%
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Capaian Rata-rata</p>
                                                <p className="text-lg font-semibold text-green-600">
                                                    {avgCapaian.toFixed(2)} {indikator.satuan}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Total Capaian</p>
                                                <p className="text-lg font-semibold">
                                                    {indikator.capaian_kinerja.length} record
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <Link href={route('capaian-kinerja.index', indikator.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Lihat Capaian
                                                </Button>
                                            </Link>

                                            <div className="flex gap-2">
                                                <Link href={route('indikator-kinerja.show', [sasaranKinerja.id, indikator.id])}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                {sasaranKinerja.status === 'draft' && (
                                                    <>
                                                        <Link href={route('indikator-kinerja.edit', [sasaranKinerja.id, indikator.id])}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin menghapus indikator ini?')) {
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
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
