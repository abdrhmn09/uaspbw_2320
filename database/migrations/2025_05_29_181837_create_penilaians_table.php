
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penilaians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sasaran_kinerja_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('penilai_id');
            $table->decimal('nilai_capaian', 5, 2);
            $table->text('komentar')->nullable();
            $table->date('tanggal_penilaian');
            $table->timestamps();

            $table->foreign('penilai_id')->references('id')->on('pegawais')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penilaians');
    }
};
