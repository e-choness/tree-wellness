<?php

namespace App\tests\Service;

use App\Entity\UserProgress;
use App\Service\XpService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;
use PHPUnit\Framework\TestCase;

class XpServiceTest extends TestCase
{
    private XpService $xpService;
    private $entityManager;
    private $userProgressRepository;

    protected function setUp(): void
    {
        $this->userProgressRepository = $this->createMock(ObjectRepository::class);
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        $this->entityManager
            ->method('getRepository')
            ->with(UserProgress::class)
            ->willReturn($this->userProgressRepository);

        $this->xpService = new XpService($this->entityManager);
    }

    public function testGetUserXpNotFound(): void
    {
        $this->userProgressRepository
            ->method('find')
            ->with(1)
            ->willReturn(null);

        $result = $this->xpService->getUserXp(1);

        $this->assertEquals(404, $result['status']);
        $this->assertEquals('User progress not found', $result['error']['message']);
    }

    public function testGetUserXpSuccess(): void
    {
        $userProgress = new UserProgress();
        $userProgress->setXp(100);

        $this->userProgressRepository
            ->method('find')
            ->with(1)
            ->willReturn($userProgress);

        $result = $this->xpService->getUserXp(1);

        $this->assertEquals(100, $result['data']['xp']);
        $this->assertNull($result['error']);
    }

    public function testAddUserXp(): void
    {
        $userProgress = new UserProgress();
        $userProgress->setXp(100);

        $this->userProgressRepository
            ->method('find')
            ->with(1)
            ->willReturn($userProgress);

        $result = $this->xpService->addUserXp(1, 50);

        $this->assertEquals(150, $result['data']['xp']);
        $this->assertNull($result['error']);
    }

    public function testResetUserXp(): void
    {
        $userProgress = new UserProgress();
        $userProgress->setXp(100);

        $this->userProgressRepository
            ->method('find')
            ->with(1)
            ->willReturn($userProgress);

        $result = $this->xpService->resetUserXp(1);

        $this->assertEquals(0, $result['data']['xp']);
        $this->assertNull($result['error']);
    }
}
