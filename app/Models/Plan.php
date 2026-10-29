<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = ['code', 'name', 'monthly_price_minor', 'currency', 'monthly_invoice_limit', 'features', 'active'];

    protected function casts(): array
    {
        return ['features' => 'array', 'active' => 'boolean'];
    }
}
