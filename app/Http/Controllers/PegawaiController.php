<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\Pegawai;
use App\Models\UnitKerja;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::with(['jabatan', 'unitKerja', 'atasan', 'user'])
            ->paginate(10);

        return Inertia::render('Pegawai/Index', [
            'pegawai' => $pegawai
        ]);
    }

    public function create()
    {
        $jabatan = Jabatan::all();
        $unitKerja = UnitKerja::all();
        $atasan = Pegawai::with('jabatan')->get();

        return Inertia::render('Pegawai/Create', [
            'jabatan' => $jabatan,
            'unitKerja' => $unitKerja,
            'atasan' => $atasan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'nip' => 'required|string|unique:pegawais',
            'nama' => 'required|string|max:255',
            'jabatan_id' => 'required|exists:jabatans,id',
            'unit_kerja_id' => 'required|exists:unit_kerjas,id',
            'atasan_id' => 'nullable|exists:pegawais,id',
            'pangkat' => 'required|string|max:100',
            'golongan' => 'required|string|max:50'
        ]);

        // Buat user terlebih dahulu
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Buat data pegawai
        Pegawai::create([
            'user_id' => $user->id,
            'nip' => $request->nip,
            'nama' => $request->nama,
            'jabatan_id' => $request->jabatan_id,
            'unit_kerja_id' => $request->unit_kerja_id,
            'atasan_id' => $request->atasan_id,
            'pangkat' => $request->pangkat,
            'golongan' => $request->golongan,
            'email' => $request->email
        ]);

        return redirect()->route('pegawai.index')
            ->with('success', 'Data pegawai berhasil ditambahkan');
    }

    public function show($id)
    {
        $pegawai = Pegawai::with(['jabatan', 'unitKerja', 'atasan', 'user', 'bawahan'])
            ->findOrFail($id);

        return Inertia::render('Pegawai/Show', [
            'pegawai' => $pegawai
        ]);
    }

    public function edit($id)
    {
        $pegawai = Pegawai::with(['jabatan', 'unitKerja', 'atasan', 'user'])
            ->findOrFail($id);

        $jabatan = Jabatan::all();
        $unitKerja = UnitKerja::all();
        $atasan = Pegawai::with('jabatan')->where('id', '!=', $id)->get();

        return Inertia::render('Pegawai/Edit', [
            'pegawai' => $pegawai,
            'jabatan' => $jabatan,
            'unitKerja' => $unitKerja,
            'atasan' => $atasan
        ]);
    }

    public function update(Request $request, $id)
    {
        $pegawai = Pegawai::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $pegawai->user_id,
            'nip' => 'required|string|unique:pegawais,nip,' . $id,
            'nama' => 'required|string|max:255',
            'jabatan_id' => 'required|exists:jabatans,id',
            'unit_kerja_id' => 'required|exists:unit_kerjas,id',
            'atasan_id' => 'nullable|exists:pegawais,id',
            'pangkat' => 'required|string|max:100',
            'golongan' => 'required|string|max:50'
        ]);

        // Update user
        $pegawai->user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update pegawai
        $pegawai->update([
            'nip' => $request->nip,
            'nama' => $request->nama,
            'jabatan_id' => $request->jabatan_id,
            'unit_kerja_id' => $request->unit_kerja_id,
            'atasan_id' => $request->atasan_id,
            'pangkat' => $request->pangkat,
            'golongan' => $request->golongan,
            'email' => $request->email
        ]);

        return redirect()->route('pegawai.index')
            ->with('success', 'Data pegawai berhasil diperbarui');
    }

    public function destroy($id)
    {
        $pegawai = Pegawai::findOrFail($id);

        // Hapus user terkait
        $pegawai->user->delete();

        // Hapus pegawai
        $pegawai->delete();

        return redirect()->route('pegawai.index')
            ->with('success', 'Data pegawai berhasil dihapus');
    }
}
