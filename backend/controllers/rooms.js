import db from "../config/database.js";

export const createRooms = (req, res, next) => {
    const {
        name,
        description,
        image
    } = req.body;
    if (!name || !description || !image) {
        return res.status(400).json({ message: "All fields are required." });
    }
    db.execute("INSERT INTO rooms(name, description, image) VALUES (?, ?, ?, ?)",
        [name, description, image],
        (err, results) => {
            console.log(err);
            if (err) return next(err);
            return res.status(201).end()
        }
    );
};

export const getRooms = (req, res, next) => {
    db.query("SELECT * FROM rooms", (err, results) => {
        if (err) return next(err);
        if (results.length === 0) return res.status(404).json({ message: "Rooms not found" });
        res.status(200).json(results);
    });
};

export const getRoomById = (req, res, next) => {
    const { id } = req.params;
    const sql = `SELECT 
            r.id, 
            r.name, 
            r.description, 
            r.image, 
            r.image_in_room_types AS imageInRoomTypes ,
            r.logo
        FROM rooms r 
        WHERE r.id = ?`
    db.query(sql, [id], (err, results) => {
        if (err) return next(err);
        if (results.length === 0)
            return res.status(404).json({ message: "Rooms not found" });
        res.status(200).json(results[0]);
    });
};

