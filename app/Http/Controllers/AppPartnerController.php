<?php

namespace App\Http\Controllers;

use App\Models\Client;
use \Illuminate\Routing\Controller;

class AppPartnerController extends \Illuminate\Routing\Controller
{
    public function index()
    {
        $apps = Client::query()->select()->where('type', 1)->get()->toArray();

        $result = collect($apps)->map(function($app) {
            return collect($app)->except(['secret', 'password_client', 'personal_access_client', 'provider', 'revoked', 'updated_at', 'created_at'])->toArray();
        })->toArray();
        return response()->json($result);
    }
}
