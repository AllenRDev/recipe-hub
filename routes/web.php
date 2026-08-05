<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/recipes', function () {
    return Inertia::render('Recipes/Index');
});

Route::get('/recipes/{recipe}', function () {
    return Inertia::render('Recipes/Show');
});

Route::middleware('auth')->group(function () {

    Route::get('/recipes/create', function () {
        return Inertia::render('Recipes/Create');
    });

    Route::get('/recipes/create', [
        RecipeController::class,
        'create'
    ])->name('recipes.create');


    Route::post('/recipes', [
        RecipeController::class,
        'store'
    ])->name('recipes.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
