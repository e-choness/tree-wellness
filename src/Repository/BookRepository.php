<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Book>
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    /**
     * @return Book[] Returns an array of Book objects
     */
    public function findByTitleOrAuthor($value): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.title = :val')
            ->orWhere('b.author = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByTitle(string $value): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.title LIKE :val')
            ->setParameter('val', '%' . $value . '%')
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findOneByAuthor($value): ?Book
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.author = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
