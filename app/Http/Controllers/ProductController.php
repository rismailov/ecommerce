<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProductsRequest;
use App\Http\Resources\ProductsResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(GetProductsRequest $request): JsonResponse
    {
        $v = fn (string $key) => $request->validated($key);

        $products = Product::with([
            'sizes', 'images', 'colors', 'reviews',
        ])
            ->withCount('reviews')
            ->when($v('collections'), function ($q) use ($v) {
                $q->whereIn('collection', $v('collections'));
            })
            ->when($v('sizes'), function ($q) use ($v) {
                $q->whereHas('sizes', function ($sub) use ($v) {
                    $sub->whereIn('sizes.id', $v('sizes'));
                });
            })
            ->when($v('colors'), function ($q) use ($v) {
                $q->whereHas('colors', function ($sub) use ($v) {
                    $sub->whereIn('colors.id', $v('colors'));
                });
            })
            ->when($v('onSale'), fn ($q) => $q->whereIsDiscounted(true))
            ->when($v('minPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) >= '.$v('minPrice'));
            })
            ->when($v('maxPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) <= '.$v('maxPrice'));
            })
            ->when($v('sort'), function ($q) use ($v) {
                [$key, $value] = explode('-', $v('sort'));

                if ($key === 'date') {
                    $q->orderBy('created_at', $value);
                }

                if ($key === 'price') {
                    $q->orderByRaw("LEAST(price, COALESCE(discount_price, price)) {$value}");
                }
            })
            ->paginate($v('limit'));

        return response()->json(
            ProductsResource::collection($products)
                ->response()->getData()
        );
    }
}
