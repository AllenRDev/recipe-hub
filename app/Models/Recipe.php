<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;


class Recipe extends Model
{
    protected $fillable = [
    'user_id',
    'title',
    'description',
    'ingredients',
    'instructions',
    'prep_time',
    'cook_time',
    'servings',
    'image',
    'category',
    'created_at',
    'updated_at',
    ];

    protected $casts = [
    'ingredients' => 'array',
    'instructions' => 'array',
    ];

    public function user(): BelongsTo
    {   
        return $this->belongsTo(User::class);
    }

    public function comments()
{
    return $this->hasMany(Comment::class);
}

    public function ratings()
{
    return $this->hasMany(Rating::class);
}

}