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
  const picture = req.files.picture[0];

  const date = String(Date.now());

  try {
    // get img name
    const resp = await pool.query(
      "SELECT * FROM info WHERE id_portfolio = ($1)",
      [id]
    );
    // delete image
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET,
      resp.rows[0].picture.split("/")[8]
    );
    // up new image
    // input image
    await storage.createFile(
      process.env.APPWRITE_BUCKET,
      "gambar" + date,
      InputFile.fromBuffer(
        picture.buffer,
        `gambar${date}.${picture.originalname.split(".")[1]}`
      )
    );

    const picturePath = `https://fra.cloud.appwrite.io/v1/storage/buckets/683c4dbb00115cec05dd/files/picture${date}/view?project=683c4dac0015a670fa6b&mode=admin`;
    await pool.query(
      "UPDATE info SET info_nama = ($1),info_email = ($2),picture = ($3),daerah = ($4),provinsi = ($5),negara = ($6),spesialis = ($7) WHERE id_info = ($8) ",
      [nama, email, picturePath, daerah, provinsi, negara, spesialis, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
