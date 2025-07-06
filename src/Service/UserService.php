<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class UserService
{
    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function createUserWithProgress(string $username): array
    {
        $requests = [
            'user' => ['route' => 'create_user', 'payload' => ['username' => $username]],
            'userProgress' => ['route' => 'create_user_progress', 'payload' => ['username' => $username]],
        ];

        $responses = $this->executeConcurrentRequests($requests);

        foreach ($responses as $key => $response) {
            if ($response['statusCode'] !== 201) {
                return [
                    'error' => [
                        'message' => 'Failed to create ' . $key,
                        'status' => $response['statusCode'],
                        'details' => $response['content'],
                    ],
                    'status' => $response['statusCode'],
                ];
            }
        }

        return [
            'data' => [
                'user' => $responses['user']['content'],
                'userProgress' => $responses['userProgress']['content'],
            ],
            'error' => null,
        ];
    }

    private function executeConcurrentRequests(array $requests): array
    {
        $httpRequests = [];
        foreach ($requests as $key => $request) {
            $httpRequests[$key] = $this->httpClient->request('POST', $request['route'], [
                'json' => $request['payload'],
            ]);
        }

        $responses = [];
        foreach ($this->httpClient->stream($httpRequests) as $response) {
            // Find the original key for the current response
            $key = array_search($response, $httpRequests, true);

            if ($key === false) {
                throw new \RuntimeException('Unexpected response received.');
            }

            $responses[$key] = [
                'statusCode' => $response->getInformationalStatus()[0],
                'content' => json_decode($response->getContent(false), true),
            ];
        }

        return $responses;
    }
}
