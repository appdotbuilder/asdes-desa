<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateBlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_published' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul artikel wajib diisi.',
            'excerpt.required' => 'Ringkasan artikel wajib diisi.',
            'excerpt.max' => 'Ringkasan artikel maksimal 500 karakter.',
            'content.required' => 'Konten artikel wajib diisi.',
            'featured_image.image' => 'File harus berupa gambar.',
            'featured_image.mimes' => 'Gambar harus berformat JPG, JPEG, atau PNG.',
            'featured_image.max' => 'Ukuran gambar maksimal 2MB.',
            'tags.*.max' => 'Tag maksimal 50 karakter.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->title),
            'is_published' => $this->boolean('is_published'),
        ]);
    }
}