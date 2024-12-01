import prisma from "../db/db.js"

export async function getMapData() {

	const data = await prisma.cidade.findMany( {
		select: {
			id: true,
			nome: true,
			xpos: true,
			ypos: true,
			Bairro: {
				select: {
					id: true,
					nome: true,
					xpos: true,
					ypos: true,
					PostoDeSaude: {
						select: {
							id: true,
							nome: true,
							telefone: true,
							endereco: true,
							xpos: true,
							ypos: true,
							CasosDeDengue: {
								select: {
									id: true,
									casos: true,
									incidencia: true,
									createdAt: true
								}
							}
						}
					}
				}
			}
		}
	} )

	await prisma.$disconnect()

	return data
}