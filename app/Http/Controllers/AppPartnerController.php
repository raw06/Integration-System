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
            $apps = Client::query()->select()->where('type', 1)->where('status', 'approved')->get()->toArray();
        } else {
            $apps = Client::query()->select()->where('type', 1)->where('collection_id', $collectionId)->where('status', 'approved')->get()->toArray();
        }
        $result = collect($apps)->map(function($app) {
            return collect($app)->except(['secret', 'password_client', 'personal_access_client', 'provider', 'revoked', 'updated_at', 'created_at'])->toArray();
        })->toArray();
        return response()->json($result);
    }

    public function detail(Request $request) {
        $id = $request->query('id');
        $app = Client::query()->select()->where('id', $id)->first();
        $result = collect($app)->except(['secret', 'password_client', 'personal_access_client', 'provider', 'revoked', 'updated_at', 'created_at'])->map(function ($field) {
            if(is_array($field)) {
                return collect($field)->map(function ($x, $key) {
                   $item['id'] =  $key;
                   $item['url'] = $x;
                   return $item;
                });
            }
            return $field;
        })->toArray();
        return response()->json($result);
    }

    public function getBySearch(Request $request) {
        $queryValue = $request->query('value') ?? '';
        $apps = Client::query()->where('name', 'like', "%$queryValue%")->get()->toArray();
        $result = collect($apps)->map(function($app) {
            return collect($app)->except(['secret', 'password_client', 'personal_access_client', 'provider', 'revoked', 'updated_at', 'created_at'])->toArray();
        })->toArray();
        return response()->json($result);
    }
}
