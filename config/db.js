import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("/home/kranthi/Desktop/tosoist-clone-orm/database/data.db");
const db = drizzle(sqlite);

export default db;

