<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IndikatorKinerja;
use App\Models\SasaranKinerja;
use App\Models\Pegawai;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class IndikatorKinerjaController extends Controller
{
    public function index($sasaran_kinerja_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->findOrFail($sasaran_kinerja_id);

        $indikatorKinerja = IndikatorKinerja::with(['capaianKinerja'])
            ->where('sasaran_kinerja_id', $sasaran_kinerja_id)
            ->get();

        return Inertia::render('IndikatorKinerja/Index', [
            'indikatorKinerja' => $indikatorKinerja,
            'sasaranKinerja' => $sasaranKinerja
        ]);
    }

    public function create($sasaran_kinerja_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($sasaran_kinerja_id);

        return Inertia::render('IndikatorKinerja/Create', [
            'sasaranKinerja' => $sasaranKinerja
        ]);
    }

    public function store(Request $request, $sasaran_kinerja_id)
    {
        $request->validate([
            'nama_indikator' => 'required|string|max:255',
            'target' => 'required|string',
            'satuan' => 'required|string|max:100',
            'bobot' => 'required|numeric|min:0|max:100'
        ]);

        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($sasaran_kinerja_id);

        IndikatorKinerja::create([
            'sasaran_kinerja_id' => $sasaran_kinerja_id,
            'nama_indikator' => $request->nama_indikator,
            'target' => $request->target,
            'satuan' => $request->satuan,
            'bobot' => $request->bobot
        ]);

        return redirect()->route('indikator-kinerja.index', $sasaran_kinerja_id)
            ->with('success', 'Indikator kinerja berhasil ditambahkan');
    }

    public function show($sasaran_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->findOrFail($sasaran_kinerja_id);

        $indikatorKinerja = IndikatorKinerja::with(['capaianKinerja'])
            ->where('sasaran_kinerja_id', $sasaran_kinerja_id)
            ->findOrFail($id);

        return Inertia::render('IndikatorKinerja/Show', [
            'indikatorKinerja' => $indikatorKinerja,
            'sasaranKinerja' => $sasaranKinerja
        ]);
    }

    public function edit($sasaran_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($sasaran_kinerja_id);

        $indikatorKinerja = IndikatorKinerja::where('sasaran_kinerja_id', $sasaran_kinerja_id)
            ->findOrFail($id);

        return Inertia::render('IndikatorKinerja/Edit', [
            'indikatorKinerja' => $indikatorKinerja,
            'sasaranKinerja' => $sasaranKinerja
        ]);
    }

    public function update(Request $request, $sasaran_kinerja_id, $id)
    {
        $request->validate([
            'nama_indikator' => 'required|string|max:255',
            'target' => 'required|string',
            'satuan' => 'required|string|max:100',
            'bobot' => 'required|numeric|min:0|max:100'
        ]);

        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($sasaran_kinerja_id);

        $indikatorKinerja = IndikatorKinerja::where('sasaran_kinerja_id', $sasaran_kinerja_id)
            ->findOrFail($id);

        $indikatorKinerja->update([
            'nama_indikator' => $request->nama_indikator,
            'target' => $request->target,
            'satuan' => $request->satuan,
            'bobot' => $request->bobot
        ]);

        return redirect()->route('indikator-kinerja.index', $sasaran_kinerja_id)
            ->with('success', 'Indikator kinerja berhasil diperbarui');
    }

    public function destroy($sasaran_kinerja_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->where('status', 'draft')
            ->findOrFail($sasaran_kinerja_id);

        $indikatorKinerja = IndikatorKinerja::where('sasaran_kinerja_id', $sasaran_kinerja_id)
            ->findOrFail($id);

        $indikatorKinerja->delete();

        return redirect()->route('indikator-kinerja.index', $sasaran_kinerja_id)
            ->with('success', 'Indikator kinerja berhasil dihapus');
    }
}
