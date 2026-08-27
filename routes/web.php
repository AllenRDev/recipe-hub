<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FavoritesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Recipe;
use Inertia\Inertia;

Route::get('/', function () {
    $featuredRecipes = Recipe::with('user')
        ->withCount('comments')
        ->withAvg('ratings', 'rating')
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'featuredRecipes' => $featuredRecipes,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/dashboard', function () {
    $user = request()->user();

    return Inertia::render('Dashboard', [
        'user' => $user,
        'recipes' => $user->recipes()
            ->with('user')
            ->withCount('comments')
            ->withAvg('ratings', 'rating')
            ->latest()
            ->paginate(6)
            ->withQueryString(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    $featuredRecipes = Recipe::with('user')
        ->withCount('comments')
        ->withAvg('ratings', 'rating')
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('Home', [
        'featuredRecipes' => $featuredRecipes,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::get('/recipes', [
    RecipeController::class,
    'index',
])->name('recipes.index');

Route::middleware('auth')->group(function () {
    Route::resource('recipes', RecipeController::class);

    Route::post('/recipes/{recipe}/rating', [
    RatingController::class,
    'store',
    ])->name('recipes.rating.store');

    Route::post('/recipes/{recipe}/comments', [
    CommentController::class,
    'store',
    ])->name('recipes.comments.store');


    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])
        ->name('comments.destroy');

    Route::post('/recipes/{recipe}/favorite', [FavoriteController::class, 'store'])
        ->name('recipes.favorite');

    Route::delete('/recipes/{recipe}/favorite', [FavoriteController::class, 'destroy'])
        ->name('recipes.unfavorite');

    Route::get('/favorites', [FavoritesController::class, 'index'])
        ->name('favorites.index');
});

Route::get('/recipes/{recipe}', [
    RecipeController::class,
    'show',
])->name('recipes.show');

Route::get('/users/{user}', [ProfileController::class, 'show'])
    ->name('users.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
