import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMerk = async (req, res) => {
    try {
        const response = await prisma.merk.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data merk." });
    }
};

export const getMerkById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await prisma.merk.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!response) {
            return res.status(404).json({ message: "Merk tidak ditemukan." });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data merk berdasarkan ID." });
    }
};

export const createMerk = async (req, res) => {
    try {
        const { nama_merk } = req.body;

        if (!nama_merk) {
            return res.status(400).json({ message: "Nama merk harus diisi." });
        }

        const response = await prisma.merk.create({
            data: { nama_merk },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat membuat merk baru." });
    }
};

export const updateMerk = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_merk } = req.body;

        const response = await prisma.merk.update({
            where: { id: parseInt(id) },
            data: { nama_merk },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat memperbarui data merk." });
    }
};

export const deleteMerk = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await prisma.merk.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat menghapus data merk." });
    }
};
