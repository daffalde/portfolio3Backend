import { pool } from "../db/db.js";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM info");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertUpdate(req, res) {
  const { id } = req.params;
  const { nama, email, daerah, provinsi, negara, spesialis } = req.body;

  const date = String(Date.now());

  try {
    // get img name
    const resp = await pool.query(
      "SELECT * FROM info WHERE id_portfolio = ($1)",
      [id]
    );
    await pool.query(
      "UPDATE info SET info_nama = ($1),info_email = ($2),daerah = ($3),provinsi = ($4),negara = ($5),spesialis = ($6) WHERE id_info = ($7) ",
      [nama, email, daerah, provinsi, negara, spesialis, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
