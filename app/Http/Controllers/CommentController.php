<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\BlogPost;
use App\Models\Comment;
use App\Models\Report;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, $type, $id)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Determine the commentable model
        $commentable = match ($type) {
            'blog' => BlogPost::findOrFail($id),
            'report' => Report::findOrFail($id),
            default => abort(404),
        };

        $comment = $commentable->comments()->create($data);

        return redirect()->back()
            ->with('success', 'Komentar berhasil ditambahkan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        // Only comment owner or admin can delete
        if (auth()->id() !== $comment->user_id && !auth()->user()->isAdmin()) {
            abort(403);
        }

        $comment->delete();

        return redirect()->back()
            ->with('success', 'Komentar berhasil dihapus.');
    }
}