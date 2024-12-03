
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

const alertaIcon = L.icon({
	iconUrl: '/assets/alerta.svg',
	iconSize: [25, 25]
})

const cidadeIcon = L.icon({
	iconUrl: '/assets/cidade.svg',
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
							L.marker([bairro.xpos, bairro.ypos], {icon: cidadeIcon})
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

fetch("/api/v1/comentario/all")
.then(resp => resp.json())
.then(data => {
	console.log(data)
	data.forEach((alerta) => {
		console.log(alerta)
		L.marker([alerta.xpos, alerta.ypos], { icon: alertaIcon })
			.addTo(map)
			.on('click', () => renderAlerta(alerta))
			
	})
})
.catch((err) =>
	console.error(err))

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

function renderAlerta({nome, imagem}) {
	inspetor.innerHTML = `
	<h3>${nome}</h3>
	<img class="image-alerta" src="/img/${imagem}" alt="${nome}-image"/>
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

const sair_button = document.getElementById("sair-button")
sair_button.addEventListener('click', () => {
	localStorage.removeItem("token")
	location.href = "/"
})

const alerta_button = document.getElementById("alert-button")
const alerta_dialog = document.getElementById("dialog-alerta")
alerta_dialog.style.display = 'none'
let opened_dialog = false

const token = localStorage.getItem("token")
if (!token) {
	alerta_button.style.display = 'none'
}

alerta_button.addEventListener('click', () => {
	alerta_dialog.style.display = opened_dialog ? "none" : "flex"
	opened_dialog = !opened_dialog
	loadCamera()
})

const lista_alertas = document.getElementById("lista-alertas")

const input_nome = document.getElementById("input_nome")
const but_post = document.getElementById("but-post")		

but_post.addEventListener("click", (ev) => {
	navigator.geolocation.getCurrentPosition((position) => {
		let xpos = position.coords.latitude
		let ypos = position.coords.longitude

		fetch("/api/v1/comentario/postar",
		{
			method: "POST",
			body: JSON.stringify({
				token,
				nome: input_nome.value,
				xpos,
				ypos
			}),
			headers: {
				"Content-Type": "application/json",
			}
		}
		)
		.then(resp => resp.json())
		.then(data => location.reload() )
		.catch(err => {
			console.error(err)
		})
	})
})

let fotoTirada = false

function loadCamera(){
	//Captura elemento de vídeo
	var video = document.createElement("video");
	video.id = 'webCamera'
		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute('autoplay', '');
	    video.setAttribute('muted', '');
	    video.setAttribute('playsinline', '');
	    //--

		document.getElementById("foto-loader").innerHTML = ''
		document.getElementById("foto-loader").appendChild(video)
	
	//Verifica se o navegador pode capturar mídia
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
		.then( function(stream) {
			//Definir o elemento vídeo a carregar o capturado pela webcam
			if (!fotoTirada)
				video.srcObject = stream;
		})
		.catch(function(error) {
			alert("Oooopps... Falhou :'(");
		});
	}
}

function takeSnapShot(){
	//Captura elemento de vídeo
	var video = document.getElementById("webCamera");
	
	//Criando um canvas que vai guardar a imagem temporariamente
	var canvas = document.createElement('canvas');
	canvas.id = 'webCamera'
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	var ctx = canvas.getContext('2d');

	fotoTirada = true

	//Desenhando e convertendo as dimensões
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	document.getElementById("foto-loader").innerHTML = ''
	document.getElementById("foto-loader").appendChild(canvas)
	
	//Criando o JPG
	var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
	// document.querySelector("#base_img").value = dataURI;
}