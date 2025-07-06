<?php

use App\Entity\Sale;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Support\Collection;

class SalesReportService
{
    public function __construct(
        private EntityManagerInterface $em
    ) {}

    public function getTopProductsReport(): array
    {
        // SQL Aggregation (GROUP BY + SUM)
        $query = $this->em->createQueryBuilder()
            ->select('s.product AS product')
            ->addSelect('SUM(s.quantity) AS total_quantity')
            ->addSelect('SUM(s.quantity * s.price) AS total_revenue')
            ->from(Sale::class, 's')
            ->groupBy('s.product')
            ->getQuery();

        // Fetch results as plain array (indexed by DQL aliases)
        $rawResults = $query->getArrayResult();

        // Use Collection for final sorting, limiting, rounding
        $collection = new Collection($rawResults);

        $topProducts = $collection
            ->map(fn($row) => [
                'product' => $row['product'],
                'total_quantity' => (int) $row['total_quantity'],
                'total_revenue' => round((float) $row['total_revenue'], 2),
            ])
            ->sortByDesc('total_revenue')
            ->take(3)
            ->values();

        return $topProducts->all();
    }
}
