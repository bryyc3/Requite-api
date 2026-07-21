import mysql from 'mysql2';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST!,
    user: process.env.MYSQLUSER!,
    password: process.env.MYSQLPASSWORD!,
    database: process.env.MYSQLDATABASE!
}).promise();

export const db = drizzle(pool);
