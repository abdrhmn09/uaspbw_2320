<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use Illuminate\Database\Seeder;

class JabatanSeeder extends Seeder
{
    public function run(): void
    {
        $jabatans = [
            ['nama_jabatan' => 'Direktur', 'level' => 1],
            ['nama_jabatan' => 'Kepala Divisi', 'level' => 2],
            ['nama_jabatan' => 'Kepala Bagian', 'level' => 3],
            ['nama_jabatan' => 'Kepala Seksi', 'level' => 4],
            ['nama_jabatan' => 'Staff', 'level' => 5],
        ];

        foreach ($jabatans as $jabatan) {
            Jabatan::create($jabatan);
        }
    }
}

