<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $username = null;

    #[ORM\OneToOne(
        mappedBy: 'user',
        cascade: ['persist', 'remove']
    )]
    private ?UserProgress $userProgress = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getUserProgress(): ?UserProgress
    {
        return $this->userProgress;
    }

    public function setUserProgress(?UserProgress $userProgress): static
    {
        // Unset the owning side of the relation if necessary
        if ($userProgress === null && $this->userProgress !== null) {
            $this->userProgress->setUser(null);
        }

        // Set the owning side of the relation if necessary
        if ($userProgress !== null && $userProgress->getUser() !== $this) {
            $userProgress->setUser($this);
        }

        $this->userProgress = $userProgress;

        return $this;
    }
}
