<?php

namespace App\Http\Requests;

class UpdateClientRequest extends StoreClientRequest
{
    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $rules = parent::rules();
        $rules['name'] = ['sometimes', 'required', 'string', 'max:255'];

        return $rules;
    }
}
