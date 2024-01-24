<?php

namespace App\Http\Controllers;
use App\Jobs\SendEmailToUser;
use App\Models\Client;
use App\Models\User;
use App\Services\AccessTokenService;
use App\Services\AuthCodeService;
use App\Services\ClientService;
use App\Services\FileService;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Http\Controllers\ClientController as ClientPassportController;
use Laravel\Passport\Http\Rules\RedirectRule;
use Laravel\Passport\Passport;

class ClientController extends ClientPassportController
{

    private FileService $fileService;

    private ClientService $clientService;

    private AccessTokenService $accessTokenService;

    private AuthCodeService $authCodeService;

    public function __construct(
        ClientRepository $clients,
        ValidationFactory $validation,
        RedirectRule $redirectRule,
        FileService $fileService,
        ClientService $clientService,
        AccessTokenService $accessTokenService,
        AuthCodeService $authCodeService
    ) {
        parent::__construct($clients, $validation, $redirectRule);
        $this->fileService = $fileService;
        $this->clientService = $clientService;
        $this->accessTokenService = $accessTokenService;
        $this->authCodeService = $authCodeService;
    }

    public function forUser(Request $request)
    {
        $page = $request->get('page') ?? 1;
        $status = $request->get('status') ?? ['all'];
        $search = $request->get('search') ?? '';
        $userId = $request->user("api")->getAuthIdentifier();
        $query = Client::query()->where('user_id', $userId);


        if (collect($status)->first() === 'all') {
            if ($search) {
                $query->where('name', 'like', '%'. $search . '%');
            }
        } else {
            if (!$search) {
                $query->whereIn('status', $status);
            } else {
                $query->where(function ($query) use ($status, $search) {
                    $query->whereIn('status', $status)
                        ->where('name', 'like', '%'. $search . '%');
                });
            }
        }


        $clients = $query->get()->map(function ($item) {
            if($item->status == "pending" || $item->status == "rejected") {
                return $item->makeHidden("secret");
            } else {
                return $item;
            }
        })->flatten();

        $total = $clients->count();
        $perPage = 8;
        $startingPoint = ($page * $perPage) - $perPage;
        $clients = array_slice($clients->toArray(), $startingPoint, $perPage);

        $clients = new LengthAwarePaginator(
            $clients,
            $total,
            $perPage,
            $page, [
                'path' => $request->url(),
                'query' => $request->query()
            ]
        );
        return response()->json($clients);
    }

    public function store(Request $request) {
        try {
            $this->validation->make($request->all(), [
                'name'         => 'required|max:191',
                'app_link'     => 'required|max:191',
                'redirect'     => ['required', $this->redirectRule],
                'confidential' => 'boolean',
                'description'  => 'required|max:191',
                'logo'         => 'required',
                'logo.*'       => 'mimes:jpeg,bmp,png,jpg|max:2000',
                'collection_id' => 'required'
            ])->validate();
            $logo = $request->file('logo');
            $descriptionImages = collect($request->allFiles())->filter(function ($file, $key) {
                return $key !== 'logo';
            })->toArray();

            $descriptionImagesLink = [];
            if(count($descriptionImages) > 0) {
               $descriptionImagesLink = collect($this->fileService->storeFile($descriptionImages, 'description'))->flatten()->all();
            }
            $client = Client::create([
                'user_id' => $request->user("api")->getAuthIdentifier(),
                'name' => $request->name,
                'app_link' => $request->app_link,
                'secret' => Str::random(40),
                'provider' => "appUsers",
                'redirect' => $request->redirect,
                'personal_access_client' => 0,
                'password_client' => 0,
                'revoked' => false,
                'app_logo' => $this->fileService->storeFile([$logo])[0],
                'description' => $request->description ?? '',
                'back_link' => '',
                'rick_text' => $request->rick_text ?? '',
                'doc_link' => $request->document_link ?? '',
                'description_image' => $descriptionImagesLink,
                'youtube_link' => $request->youtube_link ?? '',
                'collection_id' => $request->collection_id ?? 1,
                'type' => 0,
            ]);

            if (Passport::$hashesClientSecrets) {
                return ['plainSecret' => $client->plainSecret] + $client->toArray();
            }
            return \response()->json([
                'message' => "Created successfully",
                'error' => false
            ]);
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return \response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, $clientId)
    {
        $client = $this->clients->findForUser($clientId, $request->user("api")->getAuthIdentifier());
        if (!$client) {
            return \response()->json([
                'message' => 'Not found client',
                'error' => true
            ]);
        }

        $this->validation->make($request->all(), [
            'name' => 'required|max:191',
            'app_link' => 'required|max:191',
            'redirect' => ['required', $this->redirectRule],
            'description'  => 'required|max:191',
            'logo' => 'required',
            'logo.*' => 'mimes:jpeg,bmp,png,jpg|max:2000'
        ])->validate();


        $status = $request->status ?? '';
        $logo = $request->file('logo');
        $descriptionImages = collect($request->allFiles())->filter(function ($file, $key) {
            return $key !== 'logo';
        })->toArray();
        $descriptionImagesLink = [];
        if(count($descriptionImages) > 0) {
            $descriptionImagesLink = collect($this->fileService->storeFile($descriptionImages, 'description'))->flatten()->all();
        }
        $existDescriptionImages = explode(',', $request->description_image ?? '');
        $descriptionImagesLink = collect($descriptionImagesLink)->merge($existDescriptionImages)->toArray();
        try {
            if($status == 'deactivated' || $status == 'approved') {
                $client->update([
                    'status' => $status,
                    'secret' => $request->secret
                ]);
            } else {
                $client->update([
                    'name' => $request->name,
                    'app_link' => $request->app_link,
                    'redirect' => $request->redirect,
                    'app_logo' => !$logo ? $request->logo : $this->fileService->storeFile([$logo])[0],
                    'doc_link' => $request->document_link ?? '',
                    'youtube_link' => $request->youtube_link ?? '',
                    'collection_id' => $request->collection_id ?? 1,
                    'description_image' =>   $descriptionImagesLink,
                    'rick_text' => $request->rick_text ?? '',
                    'description' => $request->description ?? 'p',
                    'secret' => Str::random(40),
                    'status' => 'pending'
                ]);
            }
            return \response()->json([
                'error' => false,
                'message' => 'Update client successfully'
            ]);
        } catch (\Exception $exception) {
            logger()->error($exception->getMessage());
            return \response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function detail($clientId): \Illuminate\Http\JsonResponse
    {
        $client = $this->clientService->getClientById($clientId);

        if(!$client) {
            return response()->json([
                'success' => false,
                'data' => []
            ]);
        }
        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    }

    public function updateStatus(Request $request, $clientId): \Illuminate\Http\JsonResponse
    {
        $client = $this->clients->findForUser($clientId, $request->user("api")->getAuthIdentifier());
        if (!$client) {
            return \response()->json([
                'message' => 'Not found client',
                'error' => true
            ]);
        }
        try {
            if ($request->status === 'deactivated') {

                // remove token and auth token when deactivated client
                $this->authCodeService->removeByClientId($client->id);
                $this->accessTokenService->removeByClientId($client->id);
            }
            $client->update([
                'secret' => $request->status === 'approved' ?$client->secret  : $request->secret,
                'status' => $request->status ?? 'pending'
            ]);
            return \response()->json([
                'error' => false,
                'message' => 'Update client successfully'
            ]);
        } catch (\Exception $exception) {
            logger()->error($exception->getMessage());
            return \response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function forAdmin(Request $request) {
        $status = $request->get('status');
        $search = $request->get('search');
        $query = Client::query();

        if ($status !== 'all') {
            if (!$search) {
                $query->where('status', $status);
            } else {
                $query->where(function ($query) use ($status, $search) {
                    $query->where('status', $status)
                        ->where('name', 'like', '%'. $search . '%');
                });
            }
        } else {
            if ($search) {
                $query->where('name', 'like', '%'. $search . '%');
            }
        }

        return $query->paginate(8);
    }

    public function updateForAdmin(Request $request, $clientId) {
        $client = $this->clientService->getClientByIdAdmin($clientId);
        if (!$client) {
            return \response()->json([
                'message' => 'Not found client',
                'error' => true
            ]);
        }
        $queryUser =  Client::query()->where('id', $clientId)
            ->select('user_id')->first()->toArray();

        $userId = $queryUser['user_id'];

        $userEmail = User::query()->where('id', $userId)
                         ->select()->first()->toArray()['email'];

        $status = $request->status;
        try {
            if($status && $status == 'rejected') {

                // remove token and auth token when reject client
                $this->authCodeService->removeByClientId($client->id);
                $this->authCodeService->removeByClientId($client->id);


                $client->update([
                    'id' => Str::orderedUuid(),
                    'secret' => Str::random(40),
                    'status' => $status
                ]);
            } else {
                $client->update([
                    'secret' => Str::random(40),
                    'status' => $status
                ]);
            }
            SendEmailToUser::dispatch($userEmail, $client)->onQueue('send-email');
            return \response()->json([
                'error' => false,
                'message' => 'Update client successfully'
            ]);
        } catch (\Exception $exception) {
            logger()->error($exception->getMessage());
            return \response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }
}
