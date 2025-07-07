<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\UserProgress;
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // A function to create a user with userRepsitory
    public function createUser(string $username): array
    {
        if (empty($username)) {
            return [
                'error' => [
                    'message' => 'Username is required',
                    'status' => 400,
                ],
                'status' => 400,
            ];
        }

        $user = new User();
        $user->setUsername($username);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Create User Progress after creating the user
        $userProgressResponse = $this->createUserProgress($username, $user);

        if ($userProgressResponse['error']) {
            return $userProgressResponse;
        }

        return [
            'data' => ['id' => $user->getId(), 'username' => $user->getUsername()],
            'error' => null,
        ];
    }

    private function createUserProgress(string $username, User $user): array
    {
        // Assuming UserProgress is an entity that tracks user progress
        $userProgress = new UserProgress();
        $userProgress->setUser($user); // Set associated User
        $userProgress->setXp(0); // Initialize XP to 0

        $this->entityManager->persist($userProgress);
        $this->entityManager->flush();

        return [
            'data' => ['id' => $userProgress->getId(), 'user id' => $userProgress->getUser()->getId(), 'xp' => $userProgress->getXp()],
            'error' => null,
        ];
    }
}
