<?php

namespace App\Controller;

use App\Service\XpService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class XpController extends AbstractController
{
    private XpService $xpService;

    public function __construct(XpService $xpService)
    {
        $this->xpService = $xpService;
    }

    #[Route('/api/user-progress/{id}/xp', name: 'get_user_xp', methods: ['GET'])]
    public function getUserXp(int $id): JsonResponse
    {
        $result = $this->xpService->getUserXp($id);

        if ($result['error']) {
            return $this->json($result['error'], $result['status']);
        }

        return $this->json($result['data'], 200);
    }

    #[Route('/api/user-progress/{id}/xp/add/{amount}', name: 'add_user_xp', methods: ['POST'])]
    public function addUserXp(int $id, int $amount): JsonResponse
    {
        $result = $this->xpService->addUserXp($id, $amount);

        if ($result['error']) {
            return $this->json($result['error'], $result['status']);
        }

        return $this->json($result['data'], 200);
    }

    #[Route('/api/user-progress/{id}/xp/reset', name: 'reset_user_xp', methods: ['POST'])]
    public function resetUserXp(int $id): JsonResponse
    {
        $result = $this->xpService->resetUserXp($id);

        if ($result['error']) {
            return $this->json($result['error'], $result['status']);
        }

        return $this->json($result['data'], 200);
    }
}
