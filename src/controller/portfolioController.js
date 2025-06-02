import { InputFile } from "node-appwrite/file";
import { storage } from "../db/appwrite.js";
import { pool } from "../db/db.js";
import "dotenv/config";

export async function getData(req, res) {
  try {
    const resp = await pool.query("SELECT * FROM portfolio");
    res.json(resp.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertData(req, res) {
  const { nama, link, tanggal, deskripsi } = req.body;
  const gambar = req.files.gambar[0];
  const logo = req.files.logo[0];

  const date = String(Date.now());

  try {
    // input image
    await storage.createFile(
      process.env.APPWRITE_BUCKET,
      "gambar" + date,
      InputFile.fromBuffer(
        gambar.buffer,
        `gambar${date}.${gambar.originalname.split(".")[1]}`
      )
    );

    await storage.createFile(
      process.env.APPWRITE_BUCKET,
      "logo" + date,
      InputFile.fromBuffer(
        logo.buffer,
        `logo${date}.${logo.originalname.split(".")[1]}`
      )
    );

    // get image path

    const gambarPath = `https://fra.cloud.appwrite.io/v1/storage/buckets/683c4dbb00115cec05dd/files/gambar${date}/view?project=683c4dac0015a670fa6b&mode=admin`;
    const logoPath = `https://fra.cloud.appwrite.io/v1/storage/buckets/683c4dbb00115cec05dd/files/logo${date}/view?project=683c4dac0015a670fa6b&mode=admin`;
    await pool.query(
      "INSERT INTO portfolio (portfolio_nama,gambar,logo,link,portfolio_tanggal,deskripsi) VALUES ($1,$2,$3,$4,$5,$6)",
      [nama, gambarPath, logoPath, link, tanggal, deskripsi]
    );
    res.json({ message: "Data ditmabahkan" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function handleDelete(req, res) {
  const { id } = req.params;
  try {
    // get img name
    const resp = await pool.query(
      "SELECT * FROM portfolio WHERE id_portfolio = ($1)",
      [id]
    );

    // delete image
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET,
      resp.rows[0].gambar.split("/")[8]
    );
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET,
      resp.rows[0].logo.split("/")[8]
    );

    // ____________________________________delete
    await pool.query("DELETE FROM portfolio WHERE id_portfolio = ($1)", [id]);
    res.json({ message: "Data dihapus" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function insertUpdate(req, res) {
  const { id } = req.params;
  const { nama, link, tanggal, deskripsi } = req.body;
  const gambar = req.files.gambar[0];
  const logo = req.files.logo[0];

  const date = String(Date.now());
  try {
    // get img name
    const resp = await pool.query(
      "SELECT * FROM portfolio WHERE id_portfolio = ($1)",
      [id]
    );

    // delete image
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET,
      resp.rows[0].gambar.split("/")[8]
    );
    await storage.deleteFile(
      process.env.APPWRITE_BUCKET,
      resp.rows[0].logo.split("/")[8]
    );

    // up new image
    // input image
    await storage.createFile(
      process.env.APPWRITE_BUCKET,
      "gambar" + date,
      InputFile.fromBuffer(
        gambar.buffer,
        `gambar${date}.${gambar.originalname.split(".")[1]}`
      )
    );

    await storage.createFile(
      process.env.APPWRITE_BUCKET,
      "logo" + date,
      InputFile.fromBuffer(
        logo.buffer,
        `logo${date}.${logo.originalname.split(".")[1]}`
      )
    );

    // get image path

    const gambarPath = `https://fra.cloud.appwrite.io/v1/storage/buckets/683c4dbb00115cec05dd/files/gambar${date}/view?project=683c4dac0015a670fa6b&mode=admin`;
    const logoPath = `https://fra.cloud.appwrite.io/v1/storage/buckets/683c4dbb00115cec05dd/files/logo${date}/view?project=683c4dac0015a670fa6b&mode=admin`;

    // ________________________________________
    await pool.query(
      "UPDATE portfolio SET portfolio_nama = ($1),gambar = ($2),logo = ($3),link = ($4),portfolio_tanggal = ($5),deskripsi = ($6) WHERE id_portfolio = ($7) ",
      [nama, gambarPath, logoPath, link, tanggal, deskripsi, id]
    );
    res.json({ message: "Data diupdate" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
