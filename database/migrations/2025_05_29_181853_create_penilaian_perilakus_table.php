
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penilaian_perilakus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained()->onDelete('cascade');
            $table->foreignId('periode_penilaian_id')->constrained()->onDelete('cascade');
            $table->decimal('orientasi_pelayanan', 3, 1);
            $table->decimal('integritas', 3, 1);
            $table->decimal('komitmen', 3, 1);
            $table->decimal('disiplin', 3, 1);
            $table->decimal('kerjasama', 3, 1);
            $table->decimal('kepemimpinan', 3, 1)->nullable();
            $table->decimal('nilai_rata_rata', 3, 1);
            $table->text('komentar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penilaian_perilakus');
    }
};
