<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/recipes', [
    RecipeController::class,
    'index',
])->name('recipes.index');

Route::middleware('auth')->group(function () {
    Route::get('/recipes/create', [
        RecipeController::class,
        'create',
    ])->name('recipes.create');

    Route::post('/recipes', [
        RecipeController::class,
        'store',
    ])->name('recipes.store');
});

Route::get('/recipes/{recipe}', [
    RecipeController::class,
    'show',
])->name('recipes.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
