<?php

namespace App\Http\Controllers;

use App\Services\ProductService;

class GetFilterOptionsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return response()->json([
            'colors' => (new ProductService)->getColorOptions(),
            'sizes' => (new ProductService)->getSizeOptions(),
        ]);
    }
}
