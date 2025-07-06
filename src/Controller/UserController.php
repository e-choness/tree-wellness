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

    #[Route('/api/user/{username}', name: 'create_user_with_progress', methods: ['POST'])]
    public function createUserWithProgress(string $username): JsonResponse
    {
        // Validate the username
        if (empty($username)) {
            return $this->json(['error' => 'Username is required'], 400);
        }

        // Call the service to create the user with progress
        $result = $this->userService->createUserWithProgress($username);

        if ($result['error']) {
            return $this->json($result['error'], $result['status']);
        }

        return $this->json($result['data'], 201);
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
