
const submit = document.getElementById("but-submit")
submit.addEventListener('click', SignIn)

function SignIn() {
	const inp_nome = document.getElementById("input-nome")
	const inp_email = document.getElementById("input-email")
	const inp_senha = document.getElementById("input-senha")

	const body = {
		nome: inp_nome.value,
		email: inp_email.value,
		senha: inp_senha.value
	}

	fetch("/api/v1/auth/signin", {
		body: JSON.stringify(body),
		headers: { Accept: 'application/json', "Content-Type": 'application/json' },
		method: "POST"
	})
	.then(resp => resp.json())
	.then(data => {
		console.log(data)
		location.href = "/"
	})
	.catch(err => {
		console.error(err)
	})
}