<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
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

    public function store(StoreReviewRequest $request, Product $product)
    {
        // checking manually and not using "auth" middleware here because I don't
        // want the user to be redirected to the "login" page
        if (! auth()->check()) {
            abort(401, __('responses.errors.needs_to_authorize'));
        }

        $product->reviews()->create([
            ...$request->validated(),
            'user_id' => auth()->user()->id,
        ]);

        return response()->json([
            'message' => __('responses.crud.saved', [
                'Model' => __('models.reviews.single'),
            ]),
        ]);

    }
}
