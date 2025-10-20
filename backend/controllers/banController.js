import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient

export const getBarang = async (req, res) => {
    try {
        const response = await prisma.barang.findMany({
            include:{
                merk:{
                    select:{nama_merk: true}
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data barang." })
    }
}

export const getBarangById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await prisma.barang.findUnique({
            where:{
                id: parseInt(id)
            },
            include:{
                merk:{
                    select:{
                        nama_merk: true
                    }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data barang berdasarkan ID." })
    }
}

export const createBarang = async (req, res) => {
    try {
        const {kategori, nama_barang, id_merk, modal, stok} = req.body
        const response = await prisma.barang.create({
            data: {
                kategori,
                nama_barang,
                id_merk,
                modal,
                stok
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error : error.code, message: error.message || "Terjadi kesalahan saat menambahkan barang baru."})
    }
}

export const updateBarang = async (req, res) => {
    try {
        const id = req.params.id
        const {kategori, nama_barang, id_merk, modal, stok} = req.body
        const response = await prisma.barang.update({
            where:{ id: parseInt(id)},
            data:{kategori, nama_barang, id_merk, modal, stok},
            include:{
                merk:{
                    select:{nama_merk: true}
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat memperbarui data barang." })
    }
}

export const deleteBarang = async (req, res) => {
    try {
        const id = req.params.id
        const response = await prisma.barang.delete({
            where:{ id: parseInt(id)}
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message || "Terjadi kesalahan saat menghapus data barang." })
    }
}
