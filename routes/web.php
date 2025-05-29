<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Adding route for SKP based on the provided changes.
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Routes untuk SKP
    Route::prefix('skp')->name('skp.')->group(function () {
        Route::get('/', [App\Http\Controllers\SKPController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\SKPController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\SKPController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [App\Http\Controllers\SKPController::class, 'edit'])->name('edit');
        Route::put('/{id}', [App\Http\Controllers\SKPController::class, 'update'])->name('update');
        Route::delete('/{id}', [App\Http\Controllers\SKPController::class, 'destroy'])->name('destroy');
    });

    // Routes untuk Pegawai (Admin)
    Route::prefix('pegawai')->name('pegawai.')->group(function () {
        Route::get('/', [App\Http\Controllers\PegawaiController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\PegawaiController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\PegawaiController::class, 'store'])->name('store');
    });

    // Routes untuk Penilaian (Atasan)
    Route::prefix('penilaian')->name('penilaian.')->group(function () {
        Route::get('/', [App\Http\Controllers\PenilaianController::class, 'index'])->name('index');
        Route::get('/{pegawai_id}/nilai', [App\Http\Controllers\PenilaianController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\PenilaianController::class, 'store'])->name('store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
