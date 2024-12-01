
var map = L.map('map')
const inspetor = document.getElementById('inspector')

var layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' })
layer.addTo(map)

navigator.geolocation.getCurrentPosition((position) => {
	map.setView([position.coords.latitude, position.coords.longitude], 14)
	// L.marker([position.coords.latitude, position.coords.longitude])
	// .addTo(map)
})

const healthIcon = L.icon({
	iconUrl: '/assets/postoDeSaudeIcon.svg',
	iconSize: [25, 25]
})

let allData = []

fetch("/api/v1/map")
	.then(resp => {
		if (resp.status == 200) {
			resp.json()
				.then((data) => {
					allData = data
					console.log(allData)

					data.forEach((cidade,lenCidade) => {
						cidade.Bairro.forEach((bairro,lenBairro) => {
							L.marker([bairro.xpos, bairro.ypos])
							.addTo(map)
							.on('click', () => renderBairro(lenBairro, lenCidade) )

							bairro.PostoDeSaude.forEach((posto,lenPosto) => {
								L.marker([posto.xpos, posto.ypos], { icon: healthIcon })
									.addTo(map)
									.on('click', () => renderPosto(lenPosto, lenBairro, lenCidade) )

								if (posto.CasosDeDengue.length > 0) {
									const { casos } = posto.CasosDeDengue[posto.CasosDeDengue.length - 1]

									L.circle([posto.xpos, posto.ypos], { radius: casos })
										.addTo(map)
								}
							})
						})
					})
				})
				.catch(err => { throw err })
		}

	})
	.catch(({ mensagem }) =>
		log_error.textContent = mensagem)

function renderBairro(lenBairro, lenCidade) {
	const cidade = allData[lenCidade]
	const bairro = cidade.Bairro[lenBairro]

	map.flyTo( [ bairro.xpos, bairro.ypos ] )

	inspetor.innerHTML = `
	<h2>${bairro.nome}</h2>
	<h4>${cidade.nome}</h4>
	<hr/>
	<h3>Postos de Saúde</h3>
	<ul>
	${
		bairro.PostoDeSaude.map((posto, lenPosto) => `
			<li onclick="renderPosto(${lenPosto}, ${lenBairro}, ${lenCidade})" class="elemento-casos-de-dengue">${posto.nome}</li>
		`).join("")
	}
	</ul>
	`
}

function renderPosto(lenPosto, lenBairro, lenCidade) {
	const cidade = allData[lenCidade]
	const bairro = cidade.Bairro[lenBairro]
	const posto = bairro.PostoDeSaude[lenPosto]

	map.flyTo( [ posto.xpos, posto.ypos ] )

	inspetor.innerHTML = `
		<h2>${posto.nome}</h2>
		<h4 onclick="renderBairro(${lenBairro}, ${lenCidade})">${bairro.nome}</h4>
		<hr/>
		<p><strong>Endereço</strong>: ${posto.endereco}</p>
		<br/>
		<p><strong>Telefone</strong>: ${posto.telefone}</p>
		<hr/>
		<h3>Dados</h3>
		<ul>
		${
			posto.CasosDeDengue.map(({casos, incidencia}) => `
				<li class="elemento-casos-de-dengue">
					<p><strong>Casos</strong>: ${casos}</p>
					<p><strong>Incidência</strong>: ${incidencia}</p>
				</li>
			`).join("")
		}
		</ul>
		`
}