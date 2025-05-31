<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\PeriodePenilaian;
use App\Models\SasaranKinerja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SKPController extends Controller
{
    public function index()
    {
        $user = Auth::user();
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

        $user = Auth::user();
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

    public function show($id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::with(['indikatorKinerja.capaianKinerja', 'periodePenilaian', 'penilaian'])
            ->where('pegawai_id', $pegawai->id)
            ->findOrFail($id);

        return Inertia::render('SKP/Show', [
            'sasaranKinerja' => $sasaranKinerja,
            'pegawai' => $pegawai
        ]);
    }

    public function edit($id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($id);

        $periodeAktif = PeriodePenilaian::where('status', 'aktif')->get();

        return Inertia::render('SKP/Edit', [
            'sasaranKinerja' => $sasaranKinerja,
            'periodeOptions' => $periodeAktif
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul_sasaran' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'periode_penilaian_id' => 'required|exists:periode_penilaians,id',
            'bobot' => 'required|numeric|min:0|max:100'
        ]);

        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($id);

        $sasaranKinerja->update([
            'periode_penilaian_id' => $request->periode_penilaian_id,
            'judul_sasaran' => $request->judul_sasaran,
            'deskripsi' => $request->deskripsi,
            'bobot' => $request->bobot
        ]);

        return redirect()->route('skp.index')->with('success', 'Sasaran kinerja berhasil diperbarui');
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($id);

        $sasaranKinerja->delete();

        return redirect()->route('skp.index')->with('success', 'Sasaran kinerja berhasil dihapus');
    }

    public function submit($id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($id);

        $sasaranKinerja->update(['status' => 'diajukan']);

        return redirect()->route('skp.index')->with('success', 'Sasaran kinerja berhasil diajukan untuk persetujuan');
    }
}
