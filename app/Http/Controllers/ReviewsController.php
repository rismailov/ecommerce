<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Product;

class ReviewsController extends Controller
{
    public function index(Product $product)
    {
        return response()->json(
            ReviewResource::collection(
                $product->reviews()->latest()->paginate(5)
            )->response()->getData()
        );
    }
}
