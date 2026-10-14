<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RecipeController;
use App\Models\Recipe;
use Illuminate\Support\Facades\Route;
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
})->name('home');

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

Route::get('/recipes', [
    RecipeController::class,
    'index',
])->name('recipes.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('recipes', RecipeController::class)->except(['index', 'show']);

    Route::post('/recipes/{recipe}/rating', [
        RatingController::class,
        'store',
    ])->middleware('throttle:60,1')->name('recipes.rating.store');

    Route::post('/recipes/{recipe}/comments', [
        CommentController::class,
        'store',
    ])->middleware('throttle:30,1')->name('recipes.comments.store');

    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])
        ->name('comments.destroy');

    Route::post('/recipes/{recipe}/favorite', [FavoriteController::class, 'store'])
        ->middleware('throttle:60,1')->name('recipes.favorite');

    Route::delete('/recipes/{recipe}/favorite', [FavoriteController::class, 'destroy'])
        ->middleware('throttle:60,1')->name('recipes.unfavorite');

    Route::get('/favorites', [FavoritesController::class, 'index'])
        ->name('favorites.index');
});

Route::get('/recipes/{recipe}', [
    RecipeController::class,
    'show',
])->name('recipes.show');

Route::get('/users/{user}', [ProfileController::class, 'show'])
    ->name('users.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
