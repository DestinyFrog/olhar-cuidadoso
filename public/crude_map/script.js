
var map = L.map('map')
const inspetor = document.getElementById('inspecao')

var layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' })
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

fetch("/api/v1/map")
.then(resp => {
	if (resp.status == 200) {
		resp.json()
		.then((data) => {
			console.log(data)

			data.forEach(cidade => {
				cidade.Bairro.forEach(({nome, xpos, ypos, PostoDeSaude}) => {
					L.marker( [xpos, ypos] )
						.addTo(map)
						.on('click', function(e) {
							console.log(nome)
						})

						PostoDeSaude.forEach(posto => {
							L.marker( [posto.xpos, posto.ypos], {icon: healthIcon} )
								.addTo(map)
								.on('click', function(e) {
									inspetor.textContent = posto.nome
								})

							if (posto.CasosDeDengue.length > 0) {
								const {casos} = posto.CasosDeDengue[ posto.CasosDeDengue.length-1 ]
								
								L.circle( [posto.xpos, posto.ypos], {radius: casos} )
									.addTo(map)
							}
					})
				})
			})
		})
		.catch(err => { throw err })
	}

})
.catch(({mensagem}) =>
	log_error.textContent = mensagem )
