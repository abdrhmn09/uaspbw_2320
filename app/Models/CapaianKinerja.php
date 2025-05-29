<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CapaianKinerja extends Model
{
    use HasFactory;

    protected $fillable = [
        'indikator_kinerja_id',
        'realisasi',
        'bukti_dukung',
        'tanggal_input',
        'keterangan'
    ];

    protected $casts = [
        'tanggal_input' => 'date'
    ];

    public function indikatorKinerja(): BelongsTo
    {
        return $this->belongsTo(IndikatorKinerja::class);
    }
}
