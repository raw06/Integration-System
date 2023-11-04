<?php

namespace App\Services;

use App\Models\Client;

class ClientService {
    public function getClientById($clientId) {
        $client = Client::query()->where('id', $clientId)->first();
        if (!$client) {
            return false;
        }
        if ($client->status === 'pending') {
            $client = collect($client->toArray())->except(['secret']);
        }
        return $client;
    }
}
