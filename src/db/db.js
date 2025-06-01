import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  host: process.env.PGHOST,
  db: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});
