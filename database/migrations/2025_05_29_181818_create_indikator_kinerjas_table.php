
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('indikator_kinerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sasaran_kinerja_id')->constrained()->onDelete('cascade');
            $table->string('nama_indikator');
            $table->decimal('target_kuantitatif', 15, 2);
            $table->string('satuan');
            $table->decimal('bobot', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('indikator_kinerjas');
    }
};
