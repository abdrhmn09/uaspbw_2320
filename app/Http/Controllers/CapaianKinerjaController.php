<?php

namespace App\Http\Controllers;

use App\Models\CapaianKinerja;
use App\Models\IndikatorKinerja;
use App\Models\SasaranKinerja;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CapaianKinerjaController extends Controller
{
    public function index($indikator_kinerja_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id);
            })
            ->findOrFail($indikator_kinerja_id);

        $capaianKinerja = CapaianKinerja::where('indikator_kinerja_id', $indikator_kinerja_id)
            ->orderBy('tanggal_capaian', 'desc')
            ->get();

        return Inertia::render('CapaianKinerja/Index', [
            'capaianKinerja' => $capaianKinerja,
            'indikatorKinerja' => $indikatorKinerja
        ]);
    }

    public function create($indikator_kinerja_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id)
                      ->where('status', '!=', 'selesai');
            })
            ->findOrFail($indikator_kinerja_id);

        return Inertia::render('CapaianKinerja/Create', [
            'indikatorKinerja' => $indikatorKinerja
        ]);
    }

    public function store(Request $request, $indikator_kinerja_id)
    {
        $request->validate([
            'tanggal_capaian' => 'required|date',
            'nilai_capaian' => 'required|numeric|min:0',
            'deskripsi' => 'required|string',
            'bukti_dukung' => 'nullable|string'
        ]);

        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id)
                      ->where('status', '!=', 'selesai');
            })
            ->findOrFail($indikator_kinerja_id);

        CapaianKinerja::create([
            'indikator_kinerja_id' => $indikator_kinerja_id,
            'tanggal_capaian' => $request->tanggal_capaian,
            'nilai_capaian' => $request->nilai_capaian,
            'deskripsi' => $request->deskripsi,
            'bukti_dukung' => $request->bukti_dukung
        ]);

        return redirect()->route('capaian-kinerja.index', $indikator_kinerja_id)
            ->with('success', 'Capaian kinerja berhasil ditambahkan');
    }

    public function show($indikator_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id);
            })
            ->findOrFail($indikator_kinerja_id);

        $capaianKinerja = CapaianKinerja::where('indikator_kinerja_id', $indikator_kinerja_id)
            ->findOrFail($id);

        return Inertia::render('CapaianKinerja/Show', [
            'capaianKinerja' => $capaianKinerja,
            'indikatorKinerja' => $indikatorKinerja
        ]);
    }

    public function edit($indikator_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id)
                      ->where('status', '!=', 'selesai');
            })
            ->findOrFail($indikator_kinerja_id);

        $capaianKinerja = CapaianKinerja::where('indikator_kinerja_id', $indikator_kinerja_id)
            ->findOrFail($id);

        return Inertia::render('CapaianKinerja/Edit', [
            'capaianKinerja' => $capaianKinerja,
            'indikatorKinerja' => $indikatorKinerja
        ]);
    }

    public function update(Request $request, $indikator_kinerja_id, $id)
    {
        $request->validate([
            'tanggal_capaian' => 'required|date',
            'nilai_capaian' => 'required|numeric|min:0',
            'deskripsi' => 'required|string',
            'bukti_dukung' => 'nullable|string'
        ]);

        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id)
                      ->where('status', '!=', 'selesai');
            })
            ->findOrFail($indikator_kinerja_id);

        $capaianKinerja = CapaianKinerja::where('indikator_kinerja_id', $indikator_kinerja_id)
            ->findOrFail($id);

        $capaianKinerja->update([
            'tanggal_capaian' => $request->tanggal_capaian,
            'nilai_capaian' => $request->nilai_capaian,
            'deskripsi' => $request->deskripsi,
            'bukti_dukung' => $request->bukti_dukung
        ]);

        return redirect()->route('capaian-kinerja.index', $indikator_kinerja_id)
            ->with('success', 'Capaian kinerja berhasil diperbarui');
    }

    public function destroy($indikator_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $indikatorKinerja = IndikatorKinerja::with(['sasaranKinerja'])
            ->whereHas('sasaranKinerja', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id)
                      ->where('status', '!=', 'selesai');
            })
            ->findOrFail($indikator_kinerja_id);

        $capaianKinerja = CapaianKinerja::where('indikator_kinerja_id', $indikator_kinerja_id)
            ->findOrFail($id);

        $capaianKinerja->delete();

        return redirect()->route('capaian-kinerja.index', $indikator_kinerja_id)
            ->with('success', 'Capaian kinerja berhasil dihapus');
    }
}
