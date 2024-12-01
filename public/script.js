const input_email = document.getElementById('input-email')
const input_password = document.getElementById('input-password')
const log_error = document.getElementById('log-error')
const form = document.getElementById('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const email = input_email.value
    const senha = input_password.value
    const req = { email, senha }

    fetch("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp => {
        switch(resp.status) {
            case 200:
				resp.json()
				.then(data => {
					localStorage.setItem("token", data.token)
					window.location.href = "/map"
				})
                break

            default:
                resp.json()
                .then(({mensagem}) =>
                    log_error.textContent = mensagem
                )
                .catch(err => { throw err })
                break
        }
    })
    .catch(({mensagem}) =>
        log_error.textContent = mensagem )
})