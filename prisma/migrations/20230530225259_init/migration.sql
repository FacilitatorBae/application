-- AlterTable
ALTER TABLE `Product` ADD COLUMN `category` ENUM('General', 'Sports', 'Gaming') NOT NULL DEFAULT 'General';
