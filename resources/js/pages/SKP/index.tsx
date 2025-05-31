
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

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
    indikator_kinerja_count?: number;
}

interface Props {
    sasaranKinerja: SasaranKinerja[];
    pegawai: {
        nama: string;
        nip: string;
        jabatan: {
            nama_jabatan: string;
        };
    };
}

export default function SKPIndex({ sasaranKinerja, pegawai }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'diajukan': return 'bg-blue-100 text-blue-800';
            case 'disetujui': return 'bg-green-100 text-green-800';
            case 'revisi': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Sasaran Kinerja Pegawai (SKP)" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Sasaran Kinerja Pegawai (SKP)</h1>
                        <p className="text-gray-600">
                            {pegawai.nama} - {pegawai.nip} - {pegawai.jabatan.nama_jabatan}
                        </p>
                    </div>
                    <Link href={route('skp.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah SKP Baru
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {sasaranKinerja.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-500">Belum ada sasaran kinerja yang dibuat.</p>
                                <Link href={route('skp.create')} className="mt-4 inline-block">
                                    <Button>Buat SKP Pertama</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        sasaranKinerja.map((skp) => (
                            <Card key={skp.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{skp.judul_sasaran}</CardTitle>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Periode: {skp.periode_penilaian.tahun}
                                                {skp.periode_penilaian.semester && ` Semester ${skp.periode_penilaian.semester}`}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={getStatusColor(skp.status)}>
                                                {skp.status.toUpperCase()}
                                            </Badge>
                                            <span className="text-sm font-medium">
                                                Bobot: {skp.bobot}%
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 mb-4">{skp.deskripsi}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Indikator: {skp.indikator_kinerja_count || 0} item
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={route('skp.show', skp.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            {skp.status === 'draft' && (
                                                <Link href={route('skp.edit', skp.id)}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button variant="outline" size="sm" className="text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
