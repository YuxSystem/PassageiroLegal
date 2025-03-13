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

    public function searchUser(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $perPage = (int)$request->input('per_page', 10);
        $page = (int)$request->input('page', 1);

        if (!$query) {
            return response()->json(['message' => 'Query parameter is required'], 400);
        }

        $users = $this->service->searchUser($query, $perPage, $page);

        if (!$users) {
            return response()->json(['message' => 'Users not found'], 404);
        }

        return response()->json([
            'users' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'total_pages' => $users->lastPage(),
                'total_items' => $users->total(),
                'per_page' => $users->perPage(),
                'next_page' => $users->nextPageUrl(),
                'previous_page' => $users->previousPageUrl(),
            ]
        ], 200);
    }
}
