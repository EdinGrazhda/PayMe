<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UploadedDocument extends Model
{
    protected $fillable = ['business_id', 'invoice_id', 'uploaded_by_user_id', 'disk', 'path', 'original_name', 'mime_type', 'size_bytes', 'status', 'extracted_data', 'extraction_confidence'];

    protected function casts(): array
    {
        return ['extracted_data' => 'array', 'extraction_confidence' => 'array'];
    }
}
