<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\Client as ClientPassport;

class Client extends ClientPassport
{
    use HasFactory;
}
