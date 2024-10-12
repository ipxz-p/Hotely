import db from "../config/database.js"

export const createReservation = (req, res, next) => {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(400).json({ message: "Room ID is required." });
    }
    db.execute("INSERT INTO reservations (room_id) VALUES (?)", [roomId], 
        (err, results) => {
            if(err) return next(err)
            return res.status(201).end()
        }
    )
}

export const getReservations = (req, res, next) => {
    const sql = `
    SELECT 
        reservations.id AS reservationId, 
        rooms.id AS roomId, 
        rooms.name,
        rooms.price,
        rooms.description,
        rooms.image
    FROM 
        reservations 
    JOIN 
        rooms ON reservations.room_id = rooms.id;
    `;

    db.query(sql, (err, results) => {
        if (err) return next(err);
        return res.status(200).json(results);
    });
};

export const deleteReservation = (req, res, next) => {
    const { id } = req.params;
    db.execute("DELETE FROM reservations WHERE id = ?", [id], (err, results) => {
        if (err) return next(err);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        return res.status(200).json({ message: "Reservation deleted successfully" });
    });
};