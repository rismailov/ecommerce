<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $callables = [];

        if (! DB::table('sizes')->count()) {
            $callables[] = SizeSeeder::class;
        }

        if (! DB::table('colors')->count()) {
            $callables[] = ColorSeeder::class;
        }

        if (! DB::table('products')->count()) {
            $callables[] = ProductSeeder::class;
        }

        if (! DB::table('reviews')->count()) {
            $callables[] = UserSeeder::class;
            $callables[] = ReviewSeeder::class;
        }

        $this->call($callables);
    }
}
