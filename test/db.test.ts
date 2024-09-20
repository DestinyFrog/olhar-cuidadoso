import { PrismaClient } from "@prisma/client"
import { config } from "dotenv"

beforeAll( () => {
	config()
} )

describe("Acesso ao MySQL", () => {
	test("ping", async () => {
		const prisma = new PrismaClient()
		await prisma.$connect()
		await prisma.$disconnect()
	})
})