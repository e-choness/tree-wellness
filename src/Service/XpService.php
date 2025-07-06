<?php

namespace App\Service;

use App\Entity\UserProgress;
use Doctrine\ORM\EntityManagerInterface;

class XpService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getUserXp(int $id): array
    {
        $userProgress = $this->entityManager->getRepository(UserProgress::class)->find($id);

        if (!$userProgress) {
            return [
                'error' => ['message' => 'User progress not found'],
                'status' => 404,
            ];
        }

        return [
            'data' => [
                'id' => $userProgress->getId(),
                'xp' => $userProgress->getXp(),
            ],
            'error' => null,
        ];
    }

    public function addUserXp(int $id, int $amount): array
    {
        $userProgress = $this->entityManager->getRepository(UserProgress::class)->find($id);

        if (!$userProgress) {
            return [
                'error' => ['message' => 'User progress not found'],
                'status' => 404,
            ];
        }

        if ($amount <= 0) {
            return [
                'error' => ['message' => 'Amount must be positive'],
                'status' => 400,
            ];
        }

        $userProgress->setXp($userProgress->getXp() + $amount);
        $this->entityManager->persist($userProgress);
        $this->entityManager->flush();

        return [
            'data' => [
                'id' => $userProgress->getId(),
                'xp' => $userProgress->getXp(),
            ],
            'error' => null,
        ];
    }

    public function resetUserXp(int $id): array
    {
        $userProgress = $this->entityManager->getRepository(UserProgress::class)->find($id);

        if (!$userProgress) {
            return [
                'error' => ['message' => 'User progress not found'],
                'status' => 404,
            ];
        }

        $userProgress->setXp(0);
        $this->entityManager->persist($userProgress);
        $this->entityManager->flush();

        return [
            'data' => [
                'id' => $userProgress->getId(),
                'xp' => $userProgress->getXp(),
            ],
            'error' => null,
        ];
    }
}
