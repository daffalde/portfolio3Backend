import { pool } from "../db/db.js";

export async function getInfo(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM info");
    res.json(resp.rows);
  } catch (e) {
    res.json(e);
  }
}
