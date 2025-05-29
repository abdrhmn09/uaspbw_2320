<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pegawai;
use App\Models\PeriodePenilaian;
use App\Models\SasaranKinerja;
use App\Models\Penilaian;
use App\Models\PenilaianPerilaku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenilaianController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        // Ambil daftar bawahan untuk dinilai
        $bawahan = Pegawai::where('atasan_id', $pegawai->id)
            ->with(['jabatan', 'unitKerja', 'sasaranKinerja.periodePenilaian'])
            ->get();

        return Inertia::render('Penilaian/Index', [
            'bawahan' => $bawahan
        ]);
    }

    public function create($pegawai_id)
    {
        $pegawai = Pegawai::with(['sasaranKinerja.indikatorKinerja.capaianKinerja'])
            ->findOrFail($pegawai_id);

        $periodeTerbaru = PeriodePenilaian::where('status', 'aktif')->first();

        return Inertia::render('Penilaian/Create', [
            'pegawai' => $pegawai,
            'periode' => $periodeTerbaru
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pegawai_id' => 'required|exists:pegawais,id',
            'periode_penilaian_id' => 'required|exists:periode_penilaians,id',
            'penilaian_sasaran' => 'required|array',
            'penilaian_perilaku' => 'required|array'
        ]);

        $user = auth()->user();
        $penilai = Pegawai::where('user_id', $user->id)->first();

        // Simpan penilaian sasaran kinerja
        foreach ($request->penilaian_sasaran as $sasaran_id => $nilai) {
            Penilaian::create([
                'sasaran_kinerja_id' => $sasaran_id,
                'penilai_id' => $penilai->id,
                'nilai_capaian' => $nilai['nilai_capaian'],
                'komentar' => $nilai['komentar'] ?? null,
                'tanggal_penilaian' => now()
            ]);
        }

        // Simpan penilaian perilaku
        $perilaku = $request->penilaian_perilaku;
        $rata_rata = (
            $perilaku['orientasi_pelayanan'] +
            $perilaku['integritas'] +
            $perilaku['komitmen'] +
            $perilaku['disiplin'] +
            $perilaku['kerjasama'] +
            ($perilaku['kepemimpinan'] ?? 0)
        ) / (isset($perilaku['kepemimpinan']) ? 6 : 5);

        PenilaianPerilaku::create([
            'pegawai_id' => $request->pegawai_id,
            'periode_penilaian_id' => $request->periode_penilaian_id,
            'orientasi_pelayanan' => $perilaku['orientasi_pelayanan'],
            'integritas' => $perilaku['integritas'],
            'komitmen' => $perilaku['komitmen'],
            'disiplin' => $perilaku['disiplin'],
            'kerjasama' => $perilaku['kerjasama'],
            'kepemimpinan' => $perilaku['kepemimpinan'] ?? null,
            'nilai_rata_rata' => $rata_rata,
            'komentar' => $perilaku['komentar'] ?? null
        ]);

        return redirect()->route('penilaian.index')->with('success', 'Penilaian berhasil disimpan');
    }
}
