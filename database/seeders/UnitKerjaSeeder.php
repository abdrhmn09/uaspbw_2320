<?php

namespace Database\Seeders;
use App\Models\UnitKerja;
use Illuminate\Database\Seeder;

class UnitKerjaSeeder extends Seeder
{
    public function run(): void
    {
        $unitKerjas = [
            ['nama_unit' => 'Kantor Pusat', 'parent_id' => null],
            ['nama_unit' => 'Divisi SDM', 'parent_id' => 1],
            ['nama_unit' => 'Divisi Keuangan', 'parent_id' => 1],
            ['nama_unit' => 'Divisi IT', 'parent_id' => 1],
            ['nama_unit' => 'Bagian Rekrutmen', 'parent_id' => 2],
            ['nama_unit' => 'Bagian Pengembangan', 'parent_id' => 2],
        ];

        foreach ($unitKerjas as $unitKerja) {
            UnitKerja::create($unitKerja);
        }
    }
}
