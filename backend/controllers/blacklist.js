import db from "../config/database.js"

export const createBlacklist = (req, res, next) => {
    const {
        cardBlacklist
    } = req.body
    if(!cardBlacklist) return res.status(400).json({ error: 'cardBlacklist is required' });
    db.execute("INSERT INTO blacklist(blacklist_card) VALUES (?)",
        [cardBlacklist],
        (err, results) => {
            if(err) return next(err)
            return res.status(201).end()
        }
    )
}

export const getBlacklistByCardBlacklist = (req, res, next) => {
    const {
        cardBlacklist
    } = req.params
    if(!cardBlacklist) return res.status(400).json({ error: 'cardBlacklist is required' });
    db.query("SELECT * FROM blacklist WHERE blacklist_card = ?",
        [cardBlacklist],
        (err, results) => {
            if(err) return next(err)
            return res.status(200).send(results[0])
        }
    )
}