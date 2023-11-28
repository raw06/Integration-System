<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = ['Files', 'Reviews', 'Email Capture', 'Advertising', 'Loyalty & Rewards', 'Shipping & Logistics', 'Customer support'];
        collect($collections)->each(function ($collection) {
            DB::table('collections')->insert([
                'type' => $collection,
                'created_at' => now(),
                'updated_at' => now()
        ]);
        });
    }
}
