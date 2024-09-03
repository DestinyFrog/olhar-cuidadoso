import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { config } from 'dotenv'

config()

const port = process.env["PORT"] || 3000
const api_url = `http://localhost:${port}`

describe("API test", () => {
	it("ping", async () => {
	    const response = await request(api_url)
            .get("/ping")
            .expect(200)
        expect(response.text)
            .toEqual("Hello, World!!")
	})
})