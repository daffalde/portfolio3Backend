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
  const { nama, email, picture, daerah, provinsi, negara, spesialis } =
    req.body;
  try {
    await pool.query(
      "UPDATE info SET info_nama = ($1),info_email = ($2),picture = ($3),daerah = ($4),provinsi = ($5),negara = ($6),spesialis = ($7) WHERE id_info = ($8) ",
      [nama, email, picture, daerah, provinsi, negara, spesialis, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
