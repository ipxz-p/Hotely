import db from "../config/database.js"

export const createRoomTypes = (req, res, next) => {
    const {
        roomId,
        type,
        price,
        image
    } = req.body
    if (!roomId || !type || !price || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.execute("INSERT INTO room_types(room_id, type, price, image) VALUE (?, ?, ?, ?)",
        [roomId, type, price, image],
        (err, results) => {
            if(err) return next(err)
            return res.status(201).end()
        }
    )
}

export const getRoomTypesByRoomId = (req, res, next) => {
    const { roomId } = req.params
    db.query("SELECT * FROM `room_types` WHERE room_id = ?", 
        roomId,
        (err, results) => {
            if(err) return next(err)
            if (results.length === 0) return res.status(404).json({ message: "Room types not found" });
            return res.status(200).json(results)
        }
    )
}