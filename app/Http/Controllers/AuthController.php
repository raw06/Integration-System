<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
    }

    public function userProfile(Request $request): JsonResponse
    {
        try {
            $user = $request->user('api');
            return response()->json([
                'user' => $user
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception
            ], 500);
        }
    }

    public function register(Request $request, AuthService $authService): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|between:2,100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|confirmed|min:6',
            ]);
            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }
            $authService->register($validator->validated());
            return response()->json([
                'message' => 'User successfully registered',
                'error' => false
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $input = $request->only('email', 'password');

            if (! $token = JWTAuth::attempt($input)) {
                return response()->json([
                    'error' => true,
                    'message' => "The username or password incorrect"
                ]);
            }
            $user = User::query()->where('email', $input['email'])->first();
            return $this->createNewToken($token);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e
            ], 500);
        }
    }

    public function logout() {
        auth('api')->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    public function refresh() {
        return $this->createNewToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function createNewToken(string $token): JsonResponse
    {
        return response()->json([
            'token' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
            ],
            'user' => auth('api')->user()
        ]);
    }

}
