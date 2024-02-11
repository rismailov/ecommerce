<?php

use App\Http\Controllers\GetFilterOptionsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\User\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// user profile
Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/settings/profile', [SettingsController::class, 'updateProfile']);
    Route::patch('/settings/password', [SettingsController::class, 'changePassword']);
    Route::delete('/settings/account', [SettingsController::class, 'deleteAccount']);
});

// options for product filters
Route::get('/filter-options', GetFilterOptionsController::class);

// products
Route::prefix('/products')->as('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{product:nanoid}', [ProductController::class, 'show']);
});

// reviews
Route::prefix('/reviews')->as('reviews.')->group(function () {
    Route::get('/{product}', [ReviewsController::class, 'index']);
    Route::post('/{product}', [ReviewsController::class, 'store']);
});
