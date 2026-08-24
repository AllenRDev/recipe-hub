<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Recipe;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:1000'],
        ]);

        $recipe->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $validated['body'],
        ]);

        return back();
    }

     public function destroy(Comment $comment)
    {
        abort_unless($comment->user_id === auth()->id(), 403);

        $comment->delete();

        return back()->with('success', 'Comment deleted!');
    }
}