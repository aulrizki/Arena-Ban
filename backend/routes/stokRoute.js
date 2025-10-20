import express from 'express'
import { getStok, getStokById, createStok, updateStok, deleteStok } from '../controllers/stokController.js'

const router = express.Router()

router.get('/stok', getStok)
router.get('/stok/:id', getStokById)
router.post('/stok', createStok)
router.put('/stok/:id', updateStok)
router.delete('/stok/:id', deleteStok)

export default router