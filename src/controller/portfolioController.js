import { pool } from "../db/db.js";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM portfolio");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertData(req, res) {
  const { nama, link, tanggal } = req.body;
  const gambar = req.files.logo[0].filename;
  const logo = req.files.logo[0].filename;

  const gambarPath = `https://raw.githubusercontent.com/daffalde/portfolio3Backend/refs/heads/main/uploads/${gambar}`;
  const logoPath = `https://raw.githubusercontent.com/daffalde/portfolio3Backend/refs/heads/main/uploads/${logo}`;
  try {
    await pool.query(
      "INSERT INTO portfolio (portfolio_nama,gambar,logo,link,portfolio_tanggal) VALUES ($1,$2,$3,$4,$5)",
      [nama, gambarPath, logoPath, link, tanggal]
    );
    res.json({ message: "Data ditmabahkan" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function handleDelete(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM portfolio WHERE id_portfolio = ($1)", [id]);
    res.json({ message: "Data dihapus" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertUpdate(req, res) {
  const { id } = req.params;
  const { nama, gambar, logo, link, tanggal } = req.body;
  try {
    await pool.query(
      "UPDATE portfolio SET portfolio_nama = ($1),gambar = ($2),logo = ($3),link = ($4),portfolio_tanggal = ($5) WHERE id_portfolio = ($6) ",
      [nama, gambar, logo, link, tanggal, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
