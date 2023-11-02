
import express from "express"

import { verifyAdmin } from "../utils/verifyToken.js"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js"
const router = express.Router()



router.post('/:id',verifyAdmin, createRoom)

router.put('/:id',verifyAdmin,updateRoom)
router.put('/availability/:id',updateRoomAvailability)
router.delete('/:hotilid',verifyAdmin,deleteRoom)
router.get('/:id',getRoom)
router.get('/',getRooms)


export default  router;