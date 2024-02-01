<?php

namespace App\Traits;

use Illuminate\Validation\Rules;

trait UserValidationTrait
{
    protected function userRulesBase()
    {
        return [
            'first_name' => ['required', 'string', 'min:2', 'max:255', 'alpha'],
            'last_name' => ['required', 'string', 'min:2', 'max:255', 'alpha'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'password' => ['required', Rules\Password::defaults()],
        ];
    }
}
