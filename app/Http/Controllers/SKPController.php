<?php

namespace App\Http\Controllers;


use App\Models\Pegawai;
use App\Models\PeriodePenilaian;
use App\Models\SasaranKinerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SKPController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        if (!$pegawai) {
            return redirect()->route('dashboard')->with('error', 'Data pegawai tidak ditemukan');
        }

        $sasaranKinerja = SasaranKinerja::with(['indikatorKinerja', 'periodePenilaian'])
            ->where('pegawai_id', $pegawai->id)
            ->get();

        return Inertia::render('SKP/Index', [
            'sasaranKinerja' => $sasaranKinerja,
            'pegawai' => $pegawai
        ]);
    }

    public function create()
    {
        $periodeAktif = PeriodePenilaian::where('status', 'aktif')->get();

        return Inertia::render('SKP/Create', [
            'periodeOptions' => $periodeAktif
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_sasaran' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'periode_penilaian_id' => 'required|exists:periode_penilaians,id',
            'bobot' => 'required|numeric|min:0|max:100'
        ]);

        $user = auth()->user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        SasaranKinerja::create([
            'pegawai_id' => $pegawai->id,
            'periode_penilaian_id' => $request->periode_penilaian_id,
            'judul_sasaran' => $request->judul_sasaran,
            'deskripsi' => $request->deskripsi,
            'bobot' => $request->bobot,
            'status' => 'draft'
        ]);

        return redirect()->route('skp.index')->with('success', 'Sasaran kinerja berhasil dibuat');
    }
}
