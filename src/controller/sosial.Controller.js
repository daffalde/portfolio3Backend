import { pool } from "../db/db.js";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM sosial");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertUpdate(req, res) {
  const { id } = req.params;
  const { github, linkedin, instagram, facebook, twitter } = req.body;
  try {
    await pool.query(
      "UPDATE sosial SET github = ($1),linkedin = ($2),instagram = ($3),facebook = ($4),twitter = ($5) WHERE id_sosial = ($6) ",
      [github, linkedin, instagram, facebook, twitter, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
