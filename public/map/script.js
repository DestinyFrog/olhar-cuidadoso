
fetch("/api/v1/map")
.then(resp => {

	switch(resp.status) {
		case 200:
			resp.json()
			.then(({mensagem}) =>
				console.log(mensagem)
			)
			.catch(err => { throw err })
			break
	}

})
.catch(({mensagem}) =>
	log_error.textContent = mensagem )
