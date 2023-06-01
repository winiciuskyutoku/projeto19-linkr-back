import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const configDatabase = {
    connectionString: "postgresql://linkrdbuser:senha_super_secreta_do_dbuser@localhost:5432/linkrdatabase"
}

if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase)