<?php

namespace App\tests\Service;

use App\Service\UserService;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

class UserServiceTest extends TestCase
{
    private UserService $userService;
    private $httpClient;

    protected function setUp(): void
    {
        $this->httpClient = $this->createMock(HttpClientInterface::class);
        $this->userService = new UserService($this->httpClient);
    }

    public function testCreateUserWithProgressSuccess(): void
    {
        $userResponse = $this->createMock(ResponseInterface::class);
        $userResponse
            ->method('getStatusCode')
            ->willReturn(201);
        $userResponse
            ->method('getContent')
            ->willReturn(json_encode(['id' => 1, 'username' => 'testuser']));

        $progressResponse = $this->createMock(ResponseInterface::class);
        $progressResponse
            ->method('getStatusCode')
            ->willReturn(201);
        $progressResponse
            ->method('getContent')
            ->willReturn(json_encode(['id' => 1, 'xp' => 0]));

        $this->httpClient
            ->method('request')
            ->willReturnOnConsecutiveCalls($userResponse, $progressResponse);

        $result = $this->userService->createUserWithProgress('testuser');

        $this->assertEquals('testuser', $result['data']['user']['username']);
        $this->assertEquals(0, $result['data']['userProgress']['xp']);
        $this->assertNull($result['error']);
    }

    public function testCreateUserWithProgressFailure(): void
    {
        $userResponse = $this->createMock(ResponseInterface::class);
        $userResponse
            ->method('getStatusCode')
            ->willReturn(500);

        $this->httpClient
            ->method('request')
            ->willReturn($userResponse);

        $result = $this->userService->createUserWithProgress('testuser');

        $this->assertNotNull($result['error']);
        $this->assertEquals(500, $result['status']);
    }
}
