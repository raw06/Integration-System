<?php

namespace App\Models;

use Laravel\Passport\Client as ClientPassport;

class Client extends ClientPassport
{
    protected $hidden = [
    ];

    protected $casts = [
        'description_image' => 'array'
    ];
}
