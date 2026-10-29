<?php

namespace App\Services;

use App\Models\Business;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class BusinessContext
{
    public function forUser(User $user): Business
    {
        $business = $user->businesses()->orderBy('businesses.id')->first();

        if ($business !== null) {
            return $business;
        }

        return DB::transaction(function () use ($user): Business {
            $business = Business::query()->firstOrCreate(
                ['owner_user_id' => $user->id],
                ['name' => $user->name, 'currency' => 'EUR'],
            );

            $business->users()->syncWithoutDetaching([$user->id => ['role' => 'owner']]);

            if ($business->wasRecentlyCreated) {
                $business->reminderRules()->createMany([
                    ['position' => 1, 'days_after_due' => 1, 'tone' => 'friendly'],
                    ['position' => 2, 'days_after_due' => 3, 'tone' => 'friendly'],
                    ['position' => 3, 'days_after_due' => 7, 'tone' => 'professional'],
                    ['position' => 4, 'days_after_due' => 14, 'tone' => 'firm'],
                ]);
            }

            return $business;
        });
    }
}
