
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Plus, Eye } from 'lucide-react';

interface IndikatorKinerja {
    id: number;
    nama_indikator: string;
    target: string;
    satuan: string;
    bobot: number;
    capaian_kinerja: CapaianKinerja[];
}

interface CapaianKinerja {
    id: number;
    tanggal_capaian: string;
    nilai_capaian: number;
    deskripsi: string;
}

interface SasaranKinerja {
    id: number;
    judul_sasaran: string;
    deskripsi: string;
    bobot: number;
    status: string;
    periode_penilaian: {
        tahun: number;
        semester?: number;
    };
    indikator_kinerja: IndikatorKinerja[];
    penilaian?: any[];
}

interface Props {
    sasaranKinerja: SasaranKinerja;
    pegawai: {
        nama: string;
        nip: string;
        jabatan: {
            nama_jabatan: string;
        };
    };
}

export default function ShowSKP({ sasaranKinerja, pegawai }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'diajukan': return 'bg-blue-100 text-blue-800';
            case 'disetujui': return 'bg-green-100 text-green-800';
            case 'revisi': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalCapaian = sasaranKinerja.indikator_kinerja.reduce((total, indikator) => {
        const avgCapaian = indikator.capaian_kinerja.length > 0
            ? indikator.capaian_kinerja.reduce((sum, capaian) => sum + capaian.nilai_capaian, 0) / indikator.capaian_kinerja.length
            : 0;
        return total + (avgCapaian * indikator.bobot / 100);
    }, 0);

    return (
        <AppLayout>
            <Head title={`Detail SKP - ${sasaranKinerja.judul_sasaran}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('skp.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{sasaranKinerja.judul_sasaran}</h1>
                            <p className="text-gray-600">
                                {pegawai.nama} - {pegawai.nip} - {pegawai.jabatan.nama_jabatan}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(sasaranKinerja.status)}>
                            {sasaranKinerja.status.toUpperCase()}
                        </Badge>
                        {sasaranKinerja.status === 'draft' && (
                            <Link href={route('skp.edit', sasaranKinerja.id)}>
                                <Button size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Detail SKP */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detail Sasaran Kinerja</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Periode Penilaian</label>
                            <p className="text-lg">
                                {sasaranKinerja.periode_penilaian.tahun}
                                {sasaranKinerja.periode_penilaian.semester && ` Semester ${sasaranKinerja.periode_penilaian.semester}`}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Deskripsi</label>
                            <p className="text-gray-800">{sasaranKinerja.deskripsi}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Bobot</label>
                                <p className="text-lg font-semibold">{sasaranKinerja.bobot}%</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Capaian Saat Ini</label>
                                <p className="text-lg font-semibold text-green-600">{totalCapaian.toFixed(2)}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Indikator Kinerja */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Indikator Kinerja</CardTitle>
                            {sasaranKinerja.status !== 'selesai' && (
                                <Link href={route('indikator-kinerja.create', sasaranKinerja.id)}>
                                    <Button size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Indikator
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {sasaranKinerja.indikator_kinerja.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">Belum ada indikator kinerja</p>
                                {sasaranKinerja.status !== 'selesai' && (
                                    <Link href={route('indikator-kinerja.create', sasaranKinerja.id)}>
                                        <Button>Tambah Indikator Pertama</Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sasaranKinerja.indikator_kinerja.map((indikator) => {
                                    const avgCapaian = indikator.capaian_kinerja.length > 0
                                        ? indikator.capaian_kinerja.reduce((sum, capaian) => sum + capaian.nilai_capaian, 0) / indikator.capaian_kinerja.length
                                        : 0;

                                    return (
                                        <Card key={indikator.id} className="border-l-4 border-l-blue-500">
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-lg">{indikator.nama_indikator}</h4>
                                                        <p className="text-sm text-gray-600">
                                                            Target: {indikator.target} {indikator.satuan}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-600">Bobot: {indikator.bobot}%</p>
                                                        <p className="text-lg font-semibold text-green-600">
                                                            {avgCapaian.toFixed(2)} {indikator.satuan}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">
                                                        {indikator.capaian_kinerja.length} capaian dicatat
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <Link href={route('capaian-kinerja.index', indikator.id)}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                Lihat Capaian
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('indikator-kinerja.show', [sasaranKinerja.id, indikator.id])}>
                                                            <Button variant="outline" size="sm">
                                                                Detail
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
