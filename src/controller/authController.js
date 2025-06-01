import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function handleReg(req, res) {
  const { email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  try {
    const resp = await pool.query(
      "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *",
      [email, hashPass]
    );
    res.json({ user: resp.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    // pencarian email
    const resp = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // jika email tidak ada
    if (resp.rows.length === 0) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    // pencocokan password
    const user = resp.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    // jika password salah
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    // pertukaran token
    const token = jwt.sign(
      { id: user.id_user, email: user.email },
      process.env.JWT_SECRET
    );

    // hasil token
    res.json({ token: token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
