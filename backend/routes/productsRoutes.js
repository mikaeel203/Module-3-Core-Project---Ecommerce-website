import express from "express"
import {getProductIdCon} from '../controller/productsController.js'

const router = express.Router()


router.get('/:id',getProductIdCon )


export default router