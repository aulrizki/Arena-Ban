import express from 'express'
import {getMerk, getMerkById, createMerk, updateMerk, deleteMerk} from '../controllers/merkController.js'

const router = express.Router()

router.get('/merk', getMerk)
router.get('/merk/:id', getMerkById)
router.post('/merk', createMerk)
router.put('/merk/:id', updateMerk)
router.delete('/merk/:id', deleteMerk)

export default router