<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recipe>
 */
class RecipeFactory extends Factory
{
    protected $model = Recipe::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->unique()->sentence(3),
            'description' => fake()->paragraph(),
            'ingredients' => [
                ['amount' => '1 cup', 'name' => 'Flour'],
                ['amount' => '2', 'name' => 'Eggs'],
                ['amount' => '1 tsp', 'name' => 'Salt'],
            ],
            'instructions' => [
                ['step' => 'Mix all of the ingredients together.'],
                ['step' => 'Bake until golden brown.'],
            ],
            'prep_time' => fake()->numberBetween(5, 30),
            'cook_time' => fake()->numberBetween(10, 60),
            'servings' => fake()->numberBetween(1, 8),
            'image' => 'recipes/'.fake()->uuid().'.jpg',
            'category' => fake()->randomElement(config('recipes.categories')),
        ];
    }
}
