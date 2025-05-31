<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\SasaranKinerja;
use App\Models\PeriodePenilaian;
use App\Models\Penilaian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        // Statistik untuk pegawai
        $totalSasaran = SasaranKinerja::where('pegawai_id', $pegawai->id)->count();
        $sasaranDisetujui = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'disetujui')->count();
        $sasaranMenunggu = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'diajukan')->count();

        // Jika atasan, tambah statistik bawahan
        $bawahanMenungguPersetujuan = 0;
        if ($pegawai->bawahan()->exists()) {
            $bawahanMenungguPersetujuan = SasaranKinerja::whereHas('pegawai', function ($query) use ($pegawai) {
                $query->where('atasan_id', $pegawai->id);
            })->where('status', 'diajukan')->count();
        }

        // Progress capaian kinerja periode aktif
        $periodeAktif = PeriodePenilaian::where('status', 'aktif')->first();
        $progressCapaian = [];

        if ($periodeAktif) {
            $sasaranPeriodeAktif = SasaranKinerja::with(['indikatorKinerja.capaianKinerja'])
                ->where('pegawai_id', $pegawai->id)
                ->where('periode_penilaian_id', $periodeAktif->id)
                ->where('status', 'disetujui')
                ->get();

            foreach ($sasaranPeriodeAktif as $sasaran) {
                $totalProgress = 0;
                $jumlahIndikator = $sasaran->indikatorKinerja->count();

                if ($jumlahIndikator > 0) {
                    foreach ($sasaran->indikatorKinerja as $indikator) {
                        $totalRealisasi = $indikator->capaianKinerja->sum('realisasi');
                        $persentaseCapaian = $indikator->target_kuantitatif > 0
                            ? min(($totalRealisasi / $indikator->target_kuantitatif) * 100, 100)
                            : 0;
                        $totalProgress += $persentaseCapaian;
                    }
                    $progressCapaian[] = [
                        'sasaran' => $sasaran->judul_sasaran,
                        'progress' => round($totalProgress / $jumlahIndikator, 2)
                    ];
                }
            }
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalSasaran' => $totalSasaran,
                'sasaranDisetujui' => $sasaranDisetujui,
                'sasaranMenunggu' => $sasaranMenunggu,
                'bawahanMenungguPersetujuan' => $bawahanMenungguPersetujuan
            ],
            'progressCapaian' => $progressCapaian,
            'periodeAktif' => $periodeAktif,
            'pegawai' => $pegawai
        ]);
    }

    public function laporan()
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        // Laporan kinerja per periode
        $laporanKinerja = SasaranKinerja::with(['periodePenilaian', 'penilaian'])
            ->where('pegawai_id', $pegawai->id)
            ->where('status', 'disetujui')
            ->get()
            ->groupBy('periode_penilaian_id');

        return Inertia::render('Laporan/Index', [
            'laporanKinerja' => $laporanKinerja,
            'pegawai' => $pegawai
        ]);
    }
}
