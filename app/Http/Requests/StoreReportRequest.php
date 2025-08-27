<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
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
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'category_id' => 'required|exists:categories,id',
            'priority' => 'required|in:low,medium,high,critical',
            'reporter_name' => 'required|string|max:255',
            'reporter_phone' => 'required|string|max:20',
            'reporter_email' => 'required|email|max:255',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
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
            'title.required' => 'Judul laporan wajib diisi.',
            'description.required' => 'Deskripsi masalah wajib diisi.',
            'location.required' => 'Lokasi wajib diisi.',
            'category_id.required' => 'Kategori infrastruktur wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'priority.required' => 'Tingkat prioritas wajib dipilih.',
            'priority.in' => 'Tingkat prioritas yang dipilih tidak valid.',
            'reporter_name.required' => 'Nama lengkap pelapor wajib diisi.',
            'reporter_phone.required' => 'Nomor telepon wajib diisi.',
            'reporter_email.required' => 'Email wajib diisi.',
            'reporter_email.email' => 'Format email tidak valid.',
            'attachments.*.mimes' => 'File harus berupa gambar (JPG, JPEG, PNG) atau PDF.',
            'attachments.*.max' => 'Ukuran file maksimal 2MB.',
        ];
    }
}