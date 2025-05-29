<?php

namespace Database\Seeders;

use App\Models\PeriodePenilaian;
use Illuminate\Database\Seeder;

class PeriodePenilaianSeeder extends Seeder
{
    public function run(): void
    {
        $periodes = [
            [
                'tahun' => 2024,
                'semester' => 1,
                'tanggal_mulai' => '2024-01-01',
                'tanggal_selesai' => '2024-06-30',
                'status' => 'selesai'
            ],
            [
                'tahun' => 2024,
                'semester' => 2,
                'tanggal_mulai' => '2024-07-01',
                'tanggal_selesai' => '2024-12-31',
                'status' => 'selesai'
            ],
            [
                'tahun' => 2025,
                'semester' => 1,
                'tanggal_mulai' => '2025-01-01',
                'tanggal_selesai' => '2025-06-30',
                'status' => 'aktif'
            ]
        ];

        foreach ($periodes as $periode) {
            PeriodePenilaian::create($periode);
        }
    }
}
