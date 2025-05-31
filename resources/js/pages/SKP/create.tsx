
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

interface SKPFormData {
    judul_sasaran: string;
    deskripsi: string;
    periode_penilaian_id: number | '';
    bobot: number;
    [key: string]: any;
}

interface PeriodePenilaian {
    id: number;
    tahun: number;
    semester?: number;
    status: string;
}

interface Props {
    periodeOptions: PeriodePenilaian[];
}

export default function CreateSKP({ periodeOptions }: Props) {
    const { data, setData, post, processing, errors } = useForm<SKPFormData>({
        judul_sasaran: '',
        deskripsi: '',
        periode_penilaian_id: '',
        bobot: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('skp.store'));
    };

    return (
        <AppLayout>
            <Head title="Buat SKP Baru" />

            <div className="space-y-6">
                <Heading title="Buat SKP Baru" />

                <Card>
                    <CardHeader>
                        <CardTitle>Form Sasaran Kinerja Pegawai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="judul_sasaran">Judul Sasaran Kinerja</Label>
                                <Input
                                    id="judul_sasaran"
                                    value={data.judul_sasaran}
                                    onChange={(e) => setData('judul_sasaran', e.target.value)}
                                    placeholder="Masukkan judul sasaran kinerja"
                                />
                                {errors.judul_sasaran && (
                                    <p className="text-sm text-red-500">{errors.judul_sasaran}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="deskripsi">Deskripsi</Label>
                                <textarea
                                    id="deskripsi"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Masukkan deskripsi sasaran kinerja"
                                    rows={4}
                                />
                                {errors.deskripsi && (
                                    <p className="text-sm text-red-500">{errors.deskripsi}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="periode_penilaian_id">Periode Penilaian</Label>
                                <select
                                    id="periode_penilaian_id"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.periode_penilaian_id}
                                    onChange={(e) => setData('periode_penilaian_id', Number(e.target.value))}
                                >
                                    <option value="">Pilih Periode</option>
                                    {periodeOptions?.map((periode) => (
                                        <option key={periode.id} value={periode.id}>
                                            {periode.tahun} {periode.semester ? `Semester ${periode.semester}` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.periode_penilaian_id && (
                                    <p className="text-sm text-red-500">{errors.periode_penilaian_id}</p>
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
                                    {processing ? 'Menyimpan...' : 'Simpan SKP'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('skp.index'))}
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
