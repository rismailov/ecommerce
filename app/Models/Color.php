<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;

    protected $fillable = ['value', 'hex_code'];

    /**
     * Convert color value to snake case (with hyphen delimiter).
     */
    protected function value(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str(strtolower($value))->snake('-'),
        );
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
