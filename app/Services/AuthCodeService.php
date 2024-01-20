<?php

namespace App\Services;

use App\Models\AuthCode;
use Laravel\Passport\Bridge\AuthCodeRepository;

class AuthCodeService {

    public function removeByClientId($clientId) {
       $authCodes =  AuthCode::query()->where('client_id', $clientId)->get();

       foreach ($authCodes as $authCode) {
          try {
              $authCode->delete();
          } catch (\Exception $exception) {
              logger()->error("Failed to remove auth code", [
                  'err' => $exception
              ]);
             return false;
          }
       }
       return true;
    }
}
