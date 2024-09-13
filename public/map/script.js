
fetch("/api/v1/map")
.then(resp => {

	switch(resp.status) {
		case 200:
			resp.json()
			.then((data) =>
				console.log(data)
			)
			.catch(err => { throw err })
			break
	}

})
.catch(({mensagem}) =>
	log_error.textContent = mensagem )
