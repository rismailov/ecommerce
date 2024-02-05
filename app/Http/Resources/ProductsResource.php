<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nanoid' => $this->nanoid,
            'name' => $this->name,
            'reviewsCount' => $this->reviews_count,
            'avgStars' => $this->reviews->avg('stars'),
            'imgUrl' => $this->images->where('order', 0)->first()->url,
            'price' => [
                'initial' => $this->price,
                'discounted' => $this->discount_price,
            ],
            'collection' => __('models.collections.product_subtitle', [
                'Collection' => __('models.collections.'.$this->collection),
            ]),
        ];
    }
}
