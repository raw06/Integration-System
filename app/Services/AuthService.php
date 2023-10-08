<?php

namespace App\Services;

use App\Models\User;

class AuthService {
    public function register($info) {
        User::create(array_merge(
            $info,
            ['password' => bcrypt($info['password'])]
        ));
    }
}
