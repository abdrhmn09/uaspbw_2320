<?php

namespace App\Http\Controllers;

use App\Models\CapaianKinerja;
use App\Models\IndikatorKinerja;
use App\Models\Pegawai;
use App\Models\SasaranKinerja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CapaianKinerjaController extends Controller
{
    public function index($sasaran_id, $indikator_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->findOrFail($sasaran_id);

        $indikator = IndikatorKinerja::with('capaianKinerja')
            ->where('sasaran_kinerja_id', $sasaran_id)
            ->findOrFail($indikator_id);

        return Inertia::render('CapaianKinerja/Index', [
            'sasaranKinerja' => $sasaranKinerja,
            'indikator' => $indikator,
            'capaianKinerja' => $indikator->capaianKinerja
        ]);
    }

    public function create($sasaran_id, $indikator_id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->findOrFail($sasaran_id);

        $indikator = IndikatorKinerja::where('sasaran_kinerja_id', $sasaran_id)
            ->findOrFail($indikator_id);

        return Inertia::render('CapaianKinerja/Create', [
            'sasaranKinerja' => $sasaranKinerja,
            'indikator' => $indikator
        ]);
    }

    public function store(Request $request, $sasaran_id, $indikator_id)
    {
        $request->validate([
            'realisasi' => 'required|numeric|min:0',
            'bukti_dukung' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:2048',
            'tanggal_input' => 'required|date',
            'keterangan' => 'nullable|string'
        ]);

        $buktiDukungPath = null;
        if ($request->hasFile('bukti_dukung')) {
            $buktiDukungPath = $request->file('bukti_dukung')->store('bukti_dukung', 'public');
        }

        CapaianKinerja::create([
            'indikator_kinerja_id' => $indikator_id,
            'realisasi' => $request->realisasi,
            'bukti_dukung' => $buktiDukungPath,
            'tanggal_input' => $request->tanggal_input,
            'keterangan' => $request->keterangan
        ]);

        return redirect()->route('capaian.index', [$sasaran_id, $indikator_id])
            ->with('success', 'Capaian kinerja berhasil ditambahkan');
    }

    public function edit($sasaran_id, $indikator_id, $id)
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('user_id', $user->id)->first();

        $sasaranKinerja = SasaranKinerja::where('pegawai_id', $pegawai->id)
            ->findOrFail($sasaran_id);

        $indikator = IndikatorKinerja::where('sasaran_kinerja_id', $sasaran_id)
            ->findOrFail($indikator_id);

        $capaian = CapaianKinerja::where('indikator_kinerja_id', $indikator_id)
            ->findOrFail($id);

        return Inertia::render('CapaianKinerja/Edit', [
            'sasaranKinerja' => $sasaranKinerja,
            'indikator' => $indikator,
            'capaian' => $capaian
        ]);
    }

    public function update(Request $request, $sasaran_id, $indikator_id, $id)
    {
        $request->validate([
            'realisasi' => 'required|numeric|min:0',
            'bukti_dukung' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:2048',
            'tanggal_input' => 'required|date',
            'keterangan' => 'nullable|string'
        ]);

        $capaian = CapaianKinerja::where('indikator_kinerja_id', $indikator_id)
            ->findOrFail($id);

        $updateData = [
            'realisasi' => $request->realisasi,
            'tanggal_input' => $request->tanggal_input,
            'keterangan' => $request->keterangan
        ];

        if ($request->hasFile('bukti_dukung')) {
            $updateData['bukti_dukung'] = $request->file('bukti_dukung')->store('bukti_dukung', 'public');
        }

        $capaian->update($updateData);

        return redirect()->route('capaian.index', [$sasaran_id, $indikator_id])
            ->with('success', 'Capaian kinerja berhasil diperbarui');
    }

    public function destroy($sasaran_id, $indikator_id, $id)
    {
        $capaian = CapaianKinerja::where('indikator_kinerja_id', $indikator_id)
            ->findOrFail($id);

        $capaian->delete();

        return redirect()->route('capaian.index', [$sasaran_id, $indikator_id])
            ->with('success', 'Capaian kinerja berhasil dihapus');
    }
}
