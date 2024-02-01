<?php

namespace App\Http\Requests\User\Settings;

use App\Traits\UserValidationTrait;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    use UserValidationTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = $this->userRulesBase();

        return [
            'current_password' => ['required', 'string', 'current_password'],
            'new_password' => [...$rules['password'], 'confirmed'],
        ];
    }
}
