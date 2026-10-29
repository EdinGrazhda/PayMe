<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('businesses')
            ->whereNotIn('id', DB::table('reminder_rules')->select('business_id'))
            ->orderBy('id')
            ->chunkById(200, function ($businesses): void {
                $now = now();
                $rules = [];

                foreach ($businesses as $business) {
                    foreach ([
                        [1, 1, 'friendly'],
                        [2, 3, 'friendly'],
                        [3, 7, 'professional'],
                        [4, 14, 'firm'],
                    ] as [$position, $days, $tone]) {
                        $rules[] = [
                            'business_id' => $business->id,
                            'position' => $position,
                            'days_after_due' => $days,
                            'tone' => $tone,
                            'enabled' => true,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ];
                    }
                }

                DB::table('reminder_rules')->insert($rules);
            });
    }

    public function down(): void
    {
        // Preserve any reminder rules the business may have edited after this migration.
    }
};
