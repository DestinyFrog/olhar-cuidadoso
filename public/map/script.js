
var map = L.map('map')

var layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' })
layer.addTo(map)

navigator.geolocation.getCurrentPosition((position) => {
	map.setView([position.coords.latitude, position.coords.longitude], 14)
	L.marker([position.coords.latitude, position.coords.longitude])
		.addTo(map)
})

fetch("/api/v1/map")
.then(resp => {

	if (resp.status == 200) {
		resp.json()
		.then((data) =>
			data.forEach(cidade => {
				cidade.Bairro.forEach(({nome, xpos, ypos, PostoDeSaude}) => {
					L.tooltip()
						.setLatLng( [xpos, ypos] )
						.setContent(nome)
						.addTo(map)

						PostoDeSaude.forEach(posto => {
						L.tooltip()
							.setLatLng( [posto.xpos, posto.ypos] )
							.setContent(posto.nome)
							.addTo(map)
					})
				})
			})
		)
		.catch(err => { throw err })
	}

})
.catch(({mensagem}) =>
	log_error.textContent = mensagem )
