<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = [
            'kids' => [27, 28, 29, 30, 31, 32, 33, 34],
            'women' => [35, 36, 37, 38, 39],
            'men' => [40, 41, 42, 43, 44, 45, 46],
        ];

        foreach ($collections as $collection => $sizes) {
            foreach ($sizes as $size) {
                Size::create([
                    'value' => $size,
                    'collection' => $collection,
                ]);
            }
        }
    }
}
