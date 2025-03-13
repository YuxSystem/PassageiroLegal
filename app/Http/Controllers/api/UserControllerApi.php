<?php

namespace App\Http\Controllers\api;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class UserControllerApi extends Controller
{
    public function __construct(protected UserService $service)
    {
    }

    public function changeRole(Request $request, string $id): JsonResponse
    {
        $role = $request->get('role');
        $this->service->changeRole($id, UserRoleEnum::from($role));

        return response()->json(null, 204);
    }
}
