<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Settings\UpdatePasswordRequest;
use App\Http\Requests\User\Settings\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function updateProfile(UpdateProfileRequest $request)
    {
        $request->user()->update($request->validated());

        return response()->noContent();
    }

    public function changePassword(UpdatePasswordRequest $request)
    {
        $request->user()->update([
            'password' => $request->validated('new_password'),
        ]);

        return response()->noContent();
    }

    public function deleteAccount(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $request->user()->delete();

        return response()->noContent();
    }
}
