<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BookController extends AbstractController
{
    #[Route('/api/books/search/{title}', name: 'app_book_search_by_title', methods: ['GET'])]
    public function searchByTitle(string $title, BookRepository $bookRepository): JsonResponse
    {
        $books = $bookRepository->findByTitle($title);

        return $this->json($books);
    }
}
