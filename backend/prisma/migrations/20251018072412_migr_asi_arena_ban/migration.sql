-- CreateTable
CREATE TABLE `Merk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_merk` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Barang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori` ENUM('Ban', 'Velg') NOT NULL,
    `id_merk` INTEGER NOT NULL,
    `nama_barang` VARCHAR(100) NOT NULL,
    `modal` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 0,

    INDEX `Barang_id_merk_idx`(`id_merk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StokHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_barang` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `jenis` ENUM('Masuk', 'Keluar') NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `keterangan` VARCHAR(255) NULL,
    `stok_setelah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_id_merk_fkey` FOREIGN KEY (`id_merk`) REFERENCES `Merk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StokHistory` ADD CONSTRAINT `StokHistory_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
