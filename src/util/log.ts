import { appendFileSync, writeFileSync } from "fs"

class Log {
	static Clear() {
		writeFileSync(this.file_name, "")
	}

	static Write(err:Error) {
		console.error(err)
		appendFileSync(this.file_name, err.name+" | "+this.time+" | "+err.message+"\n")
	}

	static Text(title:string, message:string) {
		appendFileSync(this.file_name, title+" | "+this.time+" | "+message+"\n")
	}

	static get time() {
		const date = new Date()
		return date.toLocaleString()
	}

	static get file_name() {
		const log_file = process.env["LOG_FILE"] || ".log"
		return log_file
	}
}

export default Log