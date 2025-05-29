
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('capaian_kinerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('indikator_kinerja_id')->constrained()->onDelete('cascade');
            $table->decimal('realisasi', 15, 2);
            $table->string('bukti_dukung')->nullable();
            $table->date('tanggal_input');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('capaian_kinerjas');
    }
};
