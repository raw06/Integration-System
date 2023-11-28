<?php

namespace App\Http\Controllers;

use App\Models\Client;
use \Illuminate\Routing\Controller;
use \Illuminate\Http\Request;
class AppPartnerController extends Controller
{
    public function index(Request $request)
    {
        $collectionId = (int)$request->query('collectionId');
        if($collectionId === 0) {
            $apps = Client::query()->select()->where('type', 1)->get()->toArray();
        } else {
            $apps = Client::query()->select()->where('type', 1)->where('collection_id', $collectionId)->get()->toArray();
        }
        $result = collect($apps)->map(function($app) {
            return collect($app)->except(['secret', 'password_client', 'personal_access_client', 'provider', 'revoked', 'updated_at', 'created_at'])->toArray();
        })->toArray();
        return response()->json($result);
    }
}
