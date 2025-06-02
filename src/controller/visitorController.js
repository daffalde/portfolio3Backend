import { pool } from "../db/db.js";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM visitor");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function insertData(req, res) {
  const { platform, tanggal } = req.body;
  try {
    await pool.query(
      "INSERT INTO visitor (platform,visitor_tanggal) VALUES ($1,$2)",
      [platform, tanggal]
    );
    res.json({ message: "Data ditmabahkan" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
