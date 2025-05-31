
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Star } from 'lucide-react';

interface PenilaianItem {
    id: number;
    pegawai_nama: string;
    pegawai_nip: string;
    periode: string;
    total_nilai: number;
    status: 'draft' | 'selesai' | 'pending';
    tanggal_penilaian: string;
}

interface Props {
    penilaian: PenilaianItem[];
}

export default function PenilaianIndex({ penilaian }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'selesai': return 'default';
            case 'pending': return 'secondary';
            case 'draft': return 'outline';
            default: return 'secondary';
        }
    };

    const getNilaiColor = (nilai: number) => {
        if (nilai >= 90) return 'text-green-600';
        if (nilai >= 80) return 'text-blue-600';
        if (nilai >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <AppLayout>
            <Head title="Penilaian Kinerja" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Heading title="Penilaian Kinerja Pegawai" />
                    <Button>
                        <FileText className="w-4 h-4 mr-2" />
                        Buat Penilaian Baru
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Penilaian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">NIP</th>
                                        <th className="text-left py-2">Nama Pegawai</th>
                                        <th className="text-left py-2">Periode</th>
                                        <th className="text-left py-2">Total Nilai</th>
                                        <th className="text-left py-2">Status</th>
                                        <th className="text-left py-2">Tanggal</th>
                                        <th className="text-left py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {penilaian.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2">{item.pegawai_nip}</td>
                                            <td className="py-2">{item.pegawai_nama}</td>
                                            <td className="py-2">{item.periode}</td>
                                            <td className="py-2">
                                                <span className={`font-semibold ${getNilaiColor(item.total_nilai)}`}>
                                                    {item.total_nilai}
                                                </span>
                                            </td>
                                            <td className="py-2">
                                                <Badge variant={getStatusColor(item.status)}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="py-2">{item.tanggal_penilaian}</td>
                                            <td className="py-2">
                                                <div className="flex gap-2">
                                                    <Link href={route('penilaian.create', item.id)}>
                                                        <Button size="sm" variant="outline">
                                                            <Star className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
