<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    #[Route('/api/user/create/{username}', name: 'create_user', methods: ['POST'])]
    public function createUser(string $username): JsonResponse
    {
        $result = $this->userService->createUser($username);

        if ($result['error']) {
            return $this->json($result['error'], $result['status']);
        }

        return $this->json(['message' => 'User created successfully', 'username' => $username], 201);
    }

    // #[Route('/api/user/{id}/progress', name: 'get_user_progress', methods: ['GET'])]
    // public function getUserProgress(int $id): JsonResponse
    // {
    //     $result = $this->userService->getUserProgress($id);

    //     if ($result['error']) {
    //         return $this->json($result['error'], $result['status']);
    //     }

    //     return $this->json($result['data'], 200);
    // }
}
