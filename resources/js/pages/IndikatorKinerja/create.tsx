
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface IndikatorFormData {
    nama_indikator: string;
    target: string;
    satuan: string;
    bobot: number;
    [key: string]: any;
}

interface SasaranKinerja {
    id: number;
    judul_sasaran: string;
}

interface Props {
    sasaranKinerja: SasaranKinerja;
}

export default function CreateIndikatorKinerja({ sasaranKinerja }: Props) {
    const { data, setData, post, processing, errors } = useForm<IndikatorFormData>({
        nama_indikator: '',
        target: '',
        satuan: '',
        bobot: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('indikator-kinerja.store', sasaranKinerja.id));
    };

    return (
        <AppLayout>
            <Head title="Tambah Indikator Kinerja" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('indikator-kinerja.index', sasaranKinerja.id)}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <Heading title="Tambah Indikator Kinerja" />
                        <p className="text-gray-600">{sasaranKinerja.judul_sasaran}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Indikator Kinerja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="nama_indikator">Nama Indikator</Label>
                                <Input
                                    id="nama_indikator"
                                    value={data.nama_indikator}
                                    onChange={(e) => setData('nama_indikator', e.target.value)}
                                    placeholder="Masukkan nama indikator kinerja"
                                />
                                {errors.nama_indikator && (
                                    <p className="text-sm text-red-500">{errors.nama_indikator}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="target">Target</Label>
                                <Input
                                    id="target"
                                    value={data.target}
                                    onChange={(e) => setData('target', e.target.value)}
                                    placeholder="Masukkan target yang ingin dicapai"
                                />
                                {errors.target && (
                                    <p className="text-sm text-red-500">{errors.target}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="satuan">Satuan</Label>
                                <Input
                                    id="satuan"
                                    value={data.satuan}
                                    onChange={(e) => setData('satuan', e.target.value)}
                                    placeholder="Contoh: pcs, kg, %, dokumen, dll"
                                />
                                {errors.satuan && (
                                    <p className="text-sm text-red-500">{errors.satuan}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="bobot">Bobot (%)</Label>
                                <Input
                                    id="bobot"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.bobot}
                                    onChange={(e) => setData('bobot', Number(e.target.value))}
                                    placeholder="Bobot dalam persen"
                                />
                                {errors.bobot && (
                                    <p className="text-sm text-red-500">{errors.bobot}</p>
                                )}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Indikator'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('indikator-kinerja.index', sasaranKinerja.id))}
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
