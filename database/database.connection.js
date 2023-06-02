import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const configDatabase = {
  feat_session_insert
    connectionString: process.env.DATABASE_URL
}


if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase)