<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Annotations as OA;

class BookController extends AbstractController
{
    /**
     * @Route("/api/books/search/{title}", name="app_book_search_by_title", methods={"GET"})
     * 
     * @OA\Get(
     *     path="/api/books/search/{title}",
     *     summary="Search for books by title",
     *     description="Returns a list of books that match the given title.",
     *     @OA\Parameter(
     *         name="title",
     *         in="path",
     *         description="The title of the book to search for",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of books",
     *         @OA\JsonContent(type="array", @OA\Items(type="object"))
     *     )
     * )
     */
    #[Route('/api/books/search/{title}', name: 'app_book_search_by_title', methods: ['GET'])]
    public function searchByTitle(string $title, BookRepository $bookRepository): JsonResponse
    {
        $books = $bookRepository->findByTitle($title);

        return $this->json($books);
    }
}
