import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

export async function OpenConnection() {
	const connection = await mysql.createConnection({
		host: process.env["MYSQL_HOST"],
		user: process.env["MYSQL_USER"],
		database: process.env["MYSQL_DB"],
		password: process.env["MYSQL_PASSWORD"],
		port: parseInt(process.env["MYSQL_PORT"]||'3306'),
		connectTimeout: 100000
	})

	return drizzle(connection)
}

export function OpenPool() {
	const connection = mysql.createPool({
		host: process.env["MYSQL_HOST"],
		user: process.env["MYSQL_USER"],
		database: process.env["MYSQL_DB"],
		password: process.env["MYSQL_PASSWORD"],
		port: parseInt(process.env["MYSQL_PORT"]||'3306'),
		connectTimeout: 100000
	})

	return drizzle(connection)
}