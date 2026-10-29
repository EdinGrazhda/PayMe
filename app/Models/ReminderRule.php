<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReminderRule extends Model
{
    protected $fillable = ['business_id', 'position', 'days_after_due', 'tone', 'enabled'];

    protected function casts(): array
    {
        return ['enabled' => 'boolean'];
    }
}
