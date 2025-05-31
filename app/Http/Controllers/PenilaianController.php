<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Penilaian;
use App\Models\SasaranKinerja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PenilaianController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        // Ambil daftar pegawai yang dinilai (bawahan)
        $daftarPenilaian = SasaranKinerja::with(['pegawai', 'periodePenilaian', 'penilaian'])
            ->whereHas('pegawai', function ($query) use ($pegawai) {
                $query->where('atasan_id', $pegawai->id);
            })
            ->where('status', 'disetujui')
            ->get()
            ->groupBy('pegawai_id');

        return Inertia::render('Penilaian/Index', [
            'daftarPenilaian' => $daftarPenilaian
        ]);
    }

    public function create($pegawai_id)
    {
        $user = Auth::user();
        $penilai = Pegawai::where('user_id', $user->id)->first();

        $pegawai = Pegawai::with(['jabatan', 'unitKerja'])
            ->where('atasan_id', $penilai->id)
            ->findOrFail($pegawai_id);

        $sasaranKinerja = SasaranKinerja::with(['indikatorKinerja.capaianKinerja'])
            ->where('pegawai_id', $pegawai_id)
            ->where('status', 'disetujui')
            ->get();

        return Inertia::render('Penilaian/Create', [
            'pegawai' => $pegawai,
            'sasaranKinerja' => $sasaranKinerja
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'penilaian' => 'required|array',
            'penilaian.*.sasaran_kinerja_id' => 'required|exists:sasaran_kinerjas,id',
            'penilaian.*.nilai_capaian' => 'required|numeric|min:0|max:100',
            'penilaian.*.komentar' => 'nullable|string'
        ]);

        $user = Auth::user();
        $penilai = Pegawai::where('user_id', $user->id)->first();

        foreach ($request->penilaian as $nilai) {
            Penilaian::updateOrCreate(
                [
                    'sasaran_kinerja_id' => $nilai['sasaran_kinerja_id'],
                    'penilai_id' => $penilai->id
                ],
                [
                    'nilai_capaian' => $nilai['nilai_capaian'],
                    'komentar' => $nilai['komentar'],
                    'tanggal_penilaian' => now()
                ]
            );
        }

        return redirect()->route('penilaian.index')
            ->with('success', 'Penilaian berhasil disimpan');
    }
}
