<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SaleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SaleRepository::class)]
#[ApiResource]
class Sale
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $product;

    #[ORM\Column(type: "integer")]
    private int $quantity = 0;

    #[ORM\Column(type: "decimal", scale: 2, nullable: true)]
    private ?float $price;

    // Getters...
    public function getProduct(): string
    {
        return $this->product;
    }
    public function getQuantity(): int
    {
        return $this->quantity;
    }
    public function getPrice(): float
    {
        return (float)$this->price;
    }
}
