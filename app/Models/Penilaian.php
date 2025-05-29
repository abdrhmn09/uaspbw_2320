<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Penilaian extends Model
{
    use HasFactory;

    protected $fillable = [
        'sasaran_kinerja_id',
        'penilai_id',
        'nilai_capaian',
        'komentar',
        'tanggal_penilaian'
    ];

    protected $casts = [
        'tanggal_penilaian' => 'date'
    ];

    public function sasaranKinerja(): BelongsTo
    {
        return $this->belongsTo(SasaranKinerja::class);
    }

    public function penilai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'penilai_id');
    }
}
