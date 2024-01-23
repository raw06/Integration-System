<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AppPartnerController;
use App\Http\Controllers\ResetPasswordController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
});

Route::middleware(['auth:api','api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userProfile']);

    Route::group(['prefix' => 'client'], function () {
        Route::get('/forAdmin', [ClientController::class, 'forAdmin']);
        Route::put('/updateForAdmin/{clientId}', [ClientController::class, 'updateForAdmin']);
        Route::get('/get', [ClientController::class, 'forUser']);
        Route::post('/create', [ClientController::class, 'store']);
        Route::get('/detail/{clientId}', [ClientController::class, 'detail']);
        Route::post('/update/{clientId}', [ClientController::class, 'update']);
        Route::put('/updateStatus/{clientId}', [ClientController::class, 'updateStatus']);
    });

    Route::group(['prefix' => 'apps'], function () {
        Route::get('/', [AppPartnerController::class, 'index']);
        Route::get('detail', [AppPartnerController::class, 'detail']);
        Route::get('search', [AppPartnerController::class, 'getBySearch']);
    });
});

Route::post('reset-password', [ResetPasswordController::class, 'sendMail']);
Route::put('reset-password/{token}', [ResetPasswordController::class, 'reset']);

