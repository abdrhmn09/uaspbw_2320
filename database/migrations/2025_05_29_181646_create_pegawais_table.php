
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pegawais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nip', 20)->unique();
            $table->string('nama');
            $table->foreignId('jabatan_id')->constrained()->onDelete('restrict');
            $table->foreignId('unit_kerja_id')->constrained()->onDelete('restrict');
            $table->unsignedBigInteger('atasan_id')->nullable();
            $table->string('pangkat')->nullable();
            $table->string('golongan')->nullable();
            $table->string('email')->unique();
            $table->timestamps();

            $table->foreign('atasan_id')->references('id')->on('pegawais')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pegawais');
    }
};
