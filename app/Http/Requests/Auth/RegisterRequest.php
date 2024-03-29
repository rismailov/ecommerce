<?php

namespace App\Http\Requests\Auth;

use App\Traits\UserValidationTrait;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'first_name' => $rules['first_name'],
            'last_name' => $rules['last_name'],
            'password' => [...$rules['password'], 'confirmed'],
            'email' => [...$rules['email'], 'unique:users'],
        ];
    }
}
