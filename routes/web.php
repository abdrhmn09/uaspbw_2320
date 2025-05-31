<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Adding route for SKP based on the provided changes.
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // SKP Routes
    Route::resource('skp', App\Http\Controllers\SKPController::class);
    Route::patch('skp/{id}/submit', [App\Http\Controllers\SKPController::class, 'submit'])->name('skp.submit');

    // Pegawai Routes
    Route::resource('pegawai', App\Http\Controllers\PegawaiController::class);

    // Penilaian Routes
    Route::get('penilaian', [App\Http\Controllers\PenilaianController::class, 'index'])->name('penilaian.index');
    Route::get('penilaian/create/{pegawai}', [App\Http\Controllers\PenilaianController::class, 'create'])->name('penilaian.create');
    Route::post('penilaian', [App\Http\Controllers\PenilaianController::class, 'store'])->name('penilaian.store');

    // Indikator Kinerja Routes
    Route::get('skp/{sasaran_kinerja}/indikator-kinerja', [App\Http\Controllers\IndikatorKinerjaController::class, 'index'])->name('indikator-kinerja.index');
    Route::get('skp/{sasaran_kinerja}/indikator-kinerja/create', [App\Http\Controllers\IndikatorKinerjaController::class, 'create'])->name('indikator-kinerja.create');
    Route::post('skp/{sasaran_kinerja}/indikator-kinerja', [App\Http\Controllers\IndikatorKinerjaController::class, 'store'])->name('indikator-kinerja.store');
    Route::get('skp/{sasaran_kinerja}/indikator-kinerja/{indikator}', [App\Http\Controllers\IndikatorKinerjaController::class, 'show'])->name('indikator-kinerja.show');
    Route::get('skp/{sasaran_kinerja}/indikator-kinerja/{indikator}/edit', [App\Http\Controllers\IndikatorKinerjaController::class, 'edit'])->name('indikator-kinerja.edit');
    Route::patch('skp/{sasaran_kinerja}/indikator-kinerja/{indikator}', [App\Http\Controllers\IndikatorKinerjaController::class, 'update'])->name('indikator-kinerja.update');
    Route::delete('skp/{sasaran_kinerja}/indikator-kinerja/{indikator}', [App\Http\Controllers\IndikatorKinerjaController::class, 'destroy'])->name('indikator-kinerja.destroy');

    // Capaian Kinerja Routes
    Route::get('indikator-kinerja/{indikator}/capaian-kinerja', [App\Http\Controllers\CapaianKinerjaController::class, 'index'])->name('capaian-kinerja.index');
    Route::get('indikator-kinerja/{indikator}/capaian-kinerja/create', [App\Http\Controllers\CapaianKinerjaController::class, 'create'])->name('capaian-kinerja.create');
    Route::post('indikator-kinerja/{indikator}/capaian-kinerja', [App\Http\Controllers\CapaianKinerjaController::class, 'store'])->name('capaian-kinerja.store');
    Route::get('indikator-kinerja/{indikator}/capaian-kinerja/{capaian}', [App\Http\Controllers\CapaianKinerjaController::class, 'show'])->name('capaian-kinerja.show');
    Route::get('indikator-kinerja/{indikator}/capaian-kinerja/{capaian}/edit', [App\Http\Controllers\CapaianKinerjaController::class, 'edit'])->name('capaian-kinerja.edit');
    Route::patch('indikator-kinerja/{indikator}/capaian-kinerja/{capaian}', [App\Http\Controllers\CapaianKinerjaController::class, 'update'])->name('capaian-kinerja.update');
    Route::delete('indikator-kinerja/{indikator}/capaian-kinerja/{capaian}', [App\Http\Controllers\CapaianKinerjaController::class, 'destroy'])->name('capaian-kinerja.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
