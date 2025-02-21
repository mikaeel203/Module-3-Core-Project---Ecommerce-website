import express from "express"
import {getCustomIdCon,getCustomsCon,addCustomCon,deleteCustomCon} from '../controller/customController.js'

const router = express.Router()


router.get('/:id',getCustomIdCon )
router.get('/',getCustomsCon)
router.post('/',addCustomCon)
router.delete('/:customize_id',deleteCustomCon)


export default router