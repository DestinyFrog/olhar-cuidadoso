import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.usuario.create( {
		data: {
			nome: 'calisto',
			email: 'pedrocalizto9@gmail.com',
			senha: 'teract'
		}
	} )

	const cidade_guarulhos = await prisma.cidade.create( {
		data: {
			nome: 'Guarulhos',
			xpos: -23.435914,
			ypos: -46.484482
		}
	} )

	const bairro_sao_joao = await prisma.bairro.create( {
		data: {
			nome: 'Jardim São João',
			xpos: -23.409565,
			ypos: -46.454261,
			idCidade: cidade_guarulhos.id
		},
	} )

	const bairro_paraventi = await prisma.bairro.create( {
		data: {
			nome: 'Paraventi',
			xpos: -23.453401542416913,
			ypos: -46.525270513217464,
			idCidade: cidade_guarulhos.id
		},
	} )

	const bairro_itapegica = await prisma.bairro.create( {
		data: {
			nome: 'Itapegica',
			xpos: -23.484252091174884,
			ypos: -46.55432953663544,
			idCidade: cidade_guarulhos.id
		},
	} )

	const bairro_presidente_dutra = await prisma.bairro.create( {
		data: {
			nome: 'Jardim Presidente Dutra',
			xpos: -23.42645633217428,
			ypos: -46.433691617566026,
			idCidade: cidade_guarulhos.id
		},
	} )

	const bairro_vila_fatima = await prisma.bairro.create( {
		data: {
			nome: 'Vila Fátima',
			xpos: -23.4579306655872,
			ypos:-46.50838327319421,
			idCidade: cidade_guarulhos.id
		},
	} )

	await prisma.bairro.createMany( {
		data: [
			{
				nome: 'Maia',
				xpos: -23.454270,
				ypos: -46.530782,
				idCidade: cidade_guarulhos.id
			},
			{
				nome: 'Centro',
				xpos: -23.467990,
				ypos: -46.531125,
				idCidade: cidade_guarulhos.id
			},
			{
				nome: 'Taboão',
				xpos: -23.425190,
				ypos: -46.500556,
				idCidade: cidade_guarulhos.id
			},
			{
				nome: 'Jardim Bom Clima',
				xpos: -23.451345,
				ypos: -46.518393,
				idCidade: cidade_guarulhos.id
			},
			{
				nome: 'Jardim Presidente Dutra',
				xpos: -23.425769,
				ypos: -46.432768,
				idCidade: cidade_guarulhos.id
			}
		]
	} )

	const ubs_soberana = await prisma.postoDeSaude.create( {
		data: {
			nome: 'UBS Soberana',
			xpos: -23.402577,
			ypos: -46.446879,
			telefone: '551122292240',
			endereco: 'Estrada Guarulhos-Nazaré, 730 - São João, Guarulhos - SP, 07162-370',
			idBairro: bairro_sao_joao.id
		}
	} )

	const ubs_serodio = await prisma.postoDeSaude.create( {
		data: 
			{
				nome: 'UBS Seródio',
				xpos: -23.417192087070312,
				ypos: -46.45716961432221,
				telefone: '551124679598',
				endereco: 'Av. Coqueiral, 111 - Cidade Serodio, Guarulhos - SP, 07150-260',
				idBairro: bairro_sao_joao.id
			}
		
	} )

	const ubs_paraventi = await prisma.postoDeSaude.create( {
		data: 
			{
				nome: 'UBS Paraventi',
				xpos: -23.456969011922833,
				ypos: -46.523342835582525,
				telefone: '1124470552',
				endereco: 'R. Vila Lobos, 340 - Jardim Paraventi, Guarulhos - SP, 07121-070',
				idBairro: bairro_paraventi.id
			}
		
	} )

	const ubs_itapegica = await prisma.postoDeSaude.create( {
		data: 
			{
				nome: 'UBS Itapegica',
				xpos: -23.491126146371062, 
				ypos: -46.551926132918666,
				telefone: '1124086968',
				endereco: 'Av. Rotary, 1453 - Vila Itapegica, Guarulhos - SP, 07042-000',
				idBairro: bairro_itapegica.id
			}
	} )

	const ubs_presidente_dutra = await prisma.postoDeSaude.create( {
		data: 
			{
				nome: 'UBS Presidente Dutra',
				xpos: -23.4315151157359,
				ypos: -46.438313314064985,
				telefone: '1124319526',
				endereco: 'Rua Nova York, 375 - Jardim Pres. Dutra, Guarulhos - SP, 07170-010',
				idBairro: bairro_presidente_dutra.id
			}
		
	} )

	const ubs_vila_fatima = await prisma.postoDeSaude.create( {
		data: 
			{
				nome: 'UBS Vila Fátima',
				xpos: -23.459423245387377,
				ypos: -46.50954739053038,
				telefone: '1124088287',
				endereco: 'R. Esmeralda, 25 - Vila Fatima, Guarulhos - SP, 07191-290',
				idBairro: bairro_vila_fatima.id
			}
		
	} )

	await prisma.casosDeDengue.createMany( {
		data: [
			{
				casos: 1515,
				incidencia: 5632.2,
				idPostoDeSaude: ubs_soberana.id
			},
			{
				casos: 263,
				incidencia: 3143.7,
				idPostoDeSaude: ubs_itapegica.id
			},
			{
				casos: 1496,
				incidencia: 4122.8,
				idPostoDeSaude: ubs_paraventi.id
			},
			{
				casos: 1093,
				incidencia: 4068.3,
				idPostoDeSaude: ubs_serodio.id
			},
			{
				casos: 1123,
				incidencia: 6451.8,
				idPostoDeSaude: ubs_presidente_dutra.id
			},
			{
				casos: 1109,
				incidencia: 3368.6,
				idPostoDeSaude: ubs_vila_fatima.id
			},
		]
	} )
}

main()
.then(async () => {
	await prisma.$disconnect()
})
.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})