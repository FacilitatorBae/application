/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isBusiness` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHot` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNew` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `category`,
    DROP COLUMN `label`,
    DROP COLUMN `url`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `images` VARCHAR(191) NULL,
    ADD COLUMN `isBusiness` BOOLEAN NOT NULL,
    ADD COLUMN `isHot` BOOLEAN NOT NULL,
    ADD COLUMN `isNew` BOOLEAN NOT NULL,
    ADD COLUMN `modifiedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ItemCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentCategory` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
