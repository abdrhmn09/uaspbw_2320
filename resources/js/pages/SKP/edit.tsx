
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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

interface SasaranKinerja {
    id: number;
    judul_sasaran: string;
    deskripsi: string;
    bobot: number;
    periode_penilaian_id: number;
}

interface Props {
    sasaranKinerja: SasaranKinerja;
    periodeOptions: PeriodePenilaian[];
}

export default function EditSKP({ sasaranKinerja, periodeOptions }: Props) {
    const { data, setData, patch, processing, errors } = useForm<SKPFormData>({
        judul_sasaran: sasaranKinerja.judul_sasaran,
        deskripsi: sasaranKinerja.deskripsi,
        periode_penilaian_id: sasaranKinerja.periode_penilaian_id,
        bobot: sasaranKinerja.bobot,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('skp.update', sasaranKinerja.id));
    };

    return (
        <AppLayout>
            <Head title="Edit SKP" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('skp.show', sasaranKinerja.id)}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <Heading title="Edit SKP" />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Sasaran Kinerja Pegawai</CardTitle>
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
                                    {processing ? 'Menyimpan...' : 'Update SKP'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('skp.show', sasaranKinerja.id))}
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
