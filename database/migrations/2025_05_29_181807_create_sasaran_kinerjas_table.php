
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sasaran_kinerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained()->onDelete('cascade');
            $table->foreignId('periode_penilaian_id')->constrained()->onDelete('cascade');
            $table->string('judul_sasaran');
            $table->text('deskripsi');
            $table->decimal('bobot', 5, 2)->default(0);
            $table->enum('status', ['draft', 'diajukan', 'disetujui', 'revisi'])->default('draft');
            $table->text('catatan_atasan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sasaran_kinerjas');
    }
};
