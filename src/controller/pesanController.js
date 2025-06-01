import { pool } from "../db/db.js";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM pesan");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertData(req, res) {
  const { nama, email, isi, tanggal } = req.body;
  try {
    await pool.query(
      "INSERT INTO pesan (pesan_nama,pesan_email,pesan_isi,pesan_tanggal) VALUES ($1,$2,$3,$4)",
      [nama, email, isi, tanggal]
    );
    res.json({ message: "Data ditmabahkan" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function handleDelete(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM pesan WHERE id_pesan = ($1)", [id]);
    res.json({ message: "Data dihapus" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
