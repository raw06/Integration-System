<?php

namespace App\Services;

use App\Models\AccessToken;

class AccessTokenService {
    public function removeByClientId($clientId) {
        $authCodes =  AccessToken::query()->where('client_id', $clientId)->get();

        foreach ($authCodes as $authCode) {
            try {
                $authCode->delete();
            } catch (\Exception $exception) {
                logger()->error("Failed to remove access token", [
                    'err' => $exception
                ]);
                return false;
            }
        }
        return true;
    }
}
