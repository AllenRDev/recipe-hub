<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->string('title');

        $table->text('description')->nullable();

        $table->json('ingredients');

        $table->json('instructions');

        $table->unsignedInteger('prep_time')->nullable();

        $table->unsignedInteger('cook_time')->nullable();

        $table->unsignedInteger('servings')->nullable();

        $table->string('image')->nullable();

        $table->string('category')->nullable();

        $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
