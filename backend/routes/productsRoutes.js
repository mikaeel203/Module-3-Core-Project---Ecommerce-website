import express from "express"
import {getProductIdCon,getProductsCon} from '../controller/productsController.js'

const router = express.Router()


router.get('/:id',getProductIdCon )
router.get('/',getProductsCon)


export default router