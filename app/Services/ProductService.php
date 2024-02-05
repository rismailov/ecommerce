<?php

namespace App\Services;

use App\Models\Color;
use App\Models\Size;

class ProductService
{
    public function getSizeOptions()
    {
        return Size::select(['id', 'value', 'collection'])->get()
            ->map(function ($size) {
                return [
                    'value' => (string) $size['id'],
                    'label' => $size['value'],
                    'collection' => $size['collection'],
                ];
            });
    }

    public function getColorOptions()
    {
        return Color::select(['id', 'value', 'hex_code'])->get()
            ->map(function ($color) {
                return [
                    'value' => (string) $color->id,
                    'label' => __('models.colors.values.'.$color->value),
                    'hex' => $color->hex_code,
                ];
            });
    }

    public static function calculateDiscountPrice(
        string $initial_price,
        string $discount_percent
    ): string {
        $percent_in_float = bcdiv((string) $discount_percent, '100', 2);
        $price_difference = bcmul($initial_price, $percent_in_float);
        $discounted_price = bcsub($initial_price, $price_difference);

        return $discounted_price;
    }
}
