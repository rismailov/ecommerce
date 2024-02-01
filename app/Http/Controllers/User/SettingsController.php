<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Settings\UpdatePasswordRequest;
use App\Http\Requests\User\Settings\UpdateProfileRequest;

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
}
