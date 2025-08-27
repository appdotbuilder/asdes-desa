<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BlogPost::with(['author', 'comments'])
            ->when(!auth()->user()?->isAdmin(), function ($q) {
                $q->published();
            })
            ->when($request->search, function ($q, $search) {
                $q->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhere('content', 'like', "%{$search}%")
                          ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->when($request->tag, function ($q, $tag) {
                $q->whereJsonContains('tags', $tag);
            });

        $posts = $query->latest('published_at')->paginate(12)->withQueryString();

        // Get popular tags
        $allTags = BlogPost::published()->pluck('tags')->flatten()->filter()->countBy();
        $popularTags = collect($allTags)->sortDesc()->take(10)->keys();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'popularTags' => $popularTags,
            'filters' => $request->only(['search', 'tag']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('blog/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        $data['author_id'] = auth()->id();

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        if ($data['is_published'] && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);

        return redirect()->route('blog.show', $post)
            ->with('success', 'Artikel berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        // Only show published posts to non-admin users
        if (!auth()->user()?->isAdmin() && !$blogPost->is_published) {
            abort(404);
        }

        $blogPost->load(['author', 'comments.user']);
        $blogPost->increment('views_count');

        // Get related posts
        $relatedPosts = BlogPost::published()
            ->where('id', '!=', $blogPost->id)
            ->whereJsonOverlaps('tags', $blogPost->tags ?? [])
            ->limit(4)
            ->get();

        return Inertia::render('blog/show', [
            'post' => $blogPost,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('blog/edit', [
            'post' => $blogPost,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        if ($data['is_published'] && !$blogPost->published_at) {
            $data['published_at'] = now();
        } elseif (!$data['is_published']) {
            $data['published_at'] = null;
        }

        $blogPost->update($data);

        return redirect()->route('blog.show', $blogPost)
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $blogPost->delete();

        return redirect()->route('blog.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }
}