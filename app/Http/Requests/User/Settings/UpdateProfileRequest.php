<?php

namespace App\Http\Requests\User\Settings;

use App\Traits\UserValidationTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
            'email' => [...$rules['email'], Rule::unique('users')->ignoreModel($this->user())],
        ];
    }
}
