// @ts-ignore
var map = L.map('map').setView([51.505, -0.09], 13);

// @ts-ignore
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// @ts-ignore
if ("geolocation" in navigator) {
/* geolocation is available */
	// @ts-ignore
	navigator.geolocation.getCurrentPosition((position) => {
		const { coords: {
			latitude, longitude
		} } = position

		// @ts-ignore
		L.marker([latitude, longitude]).addTo(map)
			.bindPopup('A pretty CSS popup.<br> Easily customizable.')
			.openPopup();

		
	})
} else {
/* geolocation IS NOT available */
}
