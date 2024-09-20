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

	await prisma.postoDeSaude.createMany( {
		data: [
			{
				nome: 'UBS Seródio',
				xpos: -23.417192087070312,
				ypos: -46.45716961432221,
				telefone: '551124679598',
				endereco: 'Av. Coqueiral, 111 - Cidade Serodio, Guarulhos - SP, 07150-260',
				idBairro: bairro_sao_joao.id
			}
		]
	} )

	await prisma.casosDeDengue.createMany( {
		data: [
			{
				casos: 1515,
				incidencia: 5632.2,
				idPostoDeSaude: ubs_soberana.id
			}
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