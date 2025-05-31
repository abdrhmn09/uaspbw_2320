
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Eye } from 'lucide-react';

interface Pegawai {
    id: number;
    nama: string;
    nip: string;
    email: string;
    jabatan: string;
    unit_kerja: string;
    status: 'aktif' | 'non-aktif';
}

interface Props {
    pegawai: Pegawai[];
}

export default function PegawaiIndex({ pegawai }: Props) {
    return (
        <AppLayout>
            <Head title="Manajemen Pegawai" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Heading title="Manajemen Pegawai" />
                    <Link href={route('pegawai.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Pegawai
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pegawai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">NIP</th>
                                        <th className="text-left py-2">Nama</th>
                                        <th className="text-left py-2">Email</th>
                                        <th className="text-left py-2">Jabatan</th>
                                        <th className="text-left py-2">Unit Kerja</th>
                                        <th className="text-left py-2">Status</th>
                                        <th className="text-left py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pegawai.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2">{item.nip}</td>
                                            <td className="py-2">{item.nama}</td>
                                            <td className="py-2">{item.email}</td>
                                            <td className="py-2">{item.jabatan}</td>
                                            <td className="py-2">{item.unit_kerja}</td>
                                            <td className="py-2">
                                                <Badge variant={item.status === 'aktif' ? 'default' : 'secondary'}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="py-2">
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
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
