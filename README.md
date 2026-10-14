# RecipeHub

A community recipe sharing application built with Laravel and Inertia.js. Users
can publish recipes, browse and search the catalogue, rate and comment on
recipes, and save their favourites.

## Features

- **Recipes** – create, edit and delete recipes with an image, ingredients,
  step-by-step instructions, prep/cook times and servings.
- **Browsing** – paginated index with search (title or description), category
  filtering and sorting (newest, oldest, A–Z, Z–A).
- **Ratings** – one rating per user per recipe with aggregated averages.
- **Comments** – authenticated users can discuss recipes and delete their own
  comments.
- **Favourites** – save recipes and view them on a dedicated page.
- **Profiles** – public author pages plus account settings for name, email,
  bio and profile photo.
- **Authentication** – registration, login, password reset and email
  verification (powered by Laravel Breeze).
- **Dark mode** – persisted, system-aware theme with no flash on load.

## Tech Stack

- **Backend:** PHP 8.3+, Laravel 13, Inertia Laravel 2, Ziggy
- **Frontend:** React 19, TypeScript, Inertia React 2, Tailwind CSS 4, Vite 8
- **Testing:** Pest 5 (PHP), Vitest 5 + Testing Library (JS)
- **Tooling:** Pint (PHP formatting), ESLint, Prettier

## Requirements

- PHP 8.3 or newer with the `pdo_sqlite` extension
- Composer
- Node.js 22+ and npm

## Getting Started

The quickest way to get a working copy is the `setup` Composer script, which
installs dependencies, creates the environment file, generates an application
key, runs migrations, links storage, and builds the frontend:

```bash
composer setup
```

Then start the development server:

```bash
composer dev
```

This runs the PHP server, queue listener, log viewer and Vite dev server
concurrently. The application is available at http://localhost:8000.

### Manual setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
npm install
npm run build
```

By default the application uses SQLite. The database file is created
automatically on migration.

## Testing

```bash
# PHP test suite (Pest)
composer test
# or
php artisan test

# Frontend test suite (Vitest)
npm run test
```

## Code Quality

```bash
# PHP formatting (Pint)
composer lint        # check
composer lint:fix    # fix

# Frontend linting / formatting
npm run lint
npm run format
npm run typecheck
```

## Project Structure

```
app/
  Http/Controllers/   Recipe, Comment, Rating, Favorite, Profile controllers
  Http/Requests/      Form request validation
  Models/             User, Recipe, Comment, Rating
  Policies/           RecipePolicy, CommentPolicy
config/recipes.php    Canonical recipe category list
database/factories/   Model factories for tests and seeding
resources/js/
  Components/         Reusable UI and feature components
  Layouts/            Shared application layout
  Pages/              Inertia page components
  Contexts/           Theme provider
tests/
  Feature/            HTTP / integration tests
  Unit/               Model tests
```

## License

RecipeHub is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
