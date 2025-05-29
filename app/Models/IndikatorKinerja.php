<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class IndikatorKinerja extends Model
{
    use HasFactory;

    protected $fillable = [
        'sasaran_kinerja_id',
        'nama_indikator',
        'target_kuantitatif',
        'satuan',
        'bobot'
    ];

    public function sasaranKinerja(): BelongsTo
    {
        return $this->belongsTo(SasaranKinerja::class);
    }

    public function capaianKinerja(): HasMany
    {
        return $this->hasMany(CapaianKinerja::class);
    }
}
