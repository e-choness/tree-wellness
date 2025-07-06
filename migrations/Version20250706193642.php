<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250706193642 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE book (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) DEFAULT NULL, author VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE TABLE sale (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, product VARCHAR(255) DEFAULT NULL, quantity INTEGER NOT NULL, price NUMERIC(10, 2) DEFAULT NULL)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE TABLE user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, xp INTEGER NOT NULL, CONSTRAINT FK_C28C1646A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C28C1646A76ED395 ON user_progress (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE sale');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_progress');
    }
}
