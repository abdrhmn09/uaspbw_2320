
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface CapaianFormData {
    tanggal_capaian: string;
    nilai_capaian: number;
    deskripsi: string;
    bukti_dukung: string;
    [key: string]: any;
}

interface IndikatorKinerja {
    id: number;
    nama_indikator: string;
    target: string;
    satuan: string;
}

interface Props {
    indikatorKinerja: IndikatorKinerja;
}

export default function CreateCapaianKinerja({ indikatorKinerja }: Props) {
    const { data, setData, post, processing, errors } = useForm<CapaianFormData>({
        tanggal_capaian: new Date().toISOString().split('T')[0],
        nilai_capaian: 0,
        deskripsi: '',
        bukti_dukung: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('capaian-kinerja.store', indikatorKinerja.id));
    };

    return (
        <AppLayout>
            <Head title="Tambah Capaian Kinerja" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('capaian-kinerja.index', indikatorKinerja.id)}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <Heading title="Tambah Capaian Kinerja" />
                        <p className="text-gray-600">{indikatorKinerja.nama_indikator}</p>
                        <p className="text-sm text-gray-500">
                            Target: {indikatorKinerja.target} {indikatorKinerja.satuan}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Capaian Kinerja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="tanggal_capaian">Tanggal Capaian</Label>
                                <Input
                                    id="tanggal_capaian"
                                    type="date"
                                    value={data.tanggal_capaian}
                                    onChange={(e) => setData('tanggal_capaian', e.target.value)}
                                />
                                {errors.tanggal_capaian && (
                                    <p className="text-sm text-red-500">{errors.tanggal_capaian}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="nilai_capaian">Nilai Capaian ({indikatorKinerja.satuan})</Label>
                                <Input
                                    id="nilai_capaian"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.nilai_capaian}
                                    onChange={(e) => setData('nilai_capaian', Number(e.target.value))}
                                    placeholder={`Masukkan nilai dalam ${indikatorKinerja.satuan}`}
                                />
                                {errors.nilai_capaian && (
                                    <p className="text-sm text-red-500">{errors.nilai_capaian}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="deskripsi">Deskripsi Capaian</Label>
                                <textarea
                                    id="deskripsi"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Jelaskan detail capaian yang telah dicapai"
                                    rows={4}
                                />
                                {errors.deskripsi && (
                                    <p className="text-sm text-red-500">{errors.deskripsi}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="bukti_dukung">Bukti Dukung (Opsional)</Label>
                                <textarea
                                    id="bukti_dukung"
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.bukti_dukung}
                                    onChange={(e) => setData('bukti_dukung', e.target.value)}
                                    placeholder="Masukkan bukti pendukung seperti link dokumen, foto, atau referensi lainnya"
                                    rows={3}
                                />
                                {errors.bukti_dukung && (
                                    <p className="text-sm text-red-500">{errors.bukti_dukung}</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Capaian'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('capaian-kinerja.index', indikatorKinerja.id))}
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
