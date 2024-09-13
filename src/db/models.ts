import { eq } from "drizzle-orm"
import { OpenPool } from "./conn.js"
import { cidades, bairros, postos_de_saude } from "./tables.js"

export async function getMapData() {
	try {
		const rows = await OpenPool()
			.select()
			.from(cidades)
			.leftJoin(bairros, eq(bairros.id_cidade, cidades.id))
			.leftJoin(postos_de_saude, eq(postos_de_saude.id_bairro, bairros.id))

		let data: Record<number, { cidade: typeof cidades.$inferSelect; bairros: typeof bairros.$inferSelect}>
		data = rows.reduce<any>((acc:any[], {bairro, cidade, posto_de_saude}) => {
			if (acc[cidade.id]) {
				const c = acc[cidade.id].bairros.find((d:any) => d.id == bairro?.id )

				if (c) {
					const index = acc[cidade.id].bairros.indexOf(c)
					acc[cidade.id].bairros[index].postos_de_saude.push(posto_de_saude)
				} else {

					const new_bairro = {
						...bairro,
						postos_de_saude: []
					}

					
					if (posto_de_saude)
						new_bairro.postos_de_saude.push(<never> posto_de_saude)

					acc[cidade.id].bairros.push(new_bairro)
				}
			}
			else {
				const new_bairro = { ... bairro, postos_de_saude: [] }

				if (posto_de_saude)
					new_bairro.postos_de_saude.push(<never> posto_de_saude)

				acc[cidade.id] = { ... cidade, bairros: [new_bairro] }
			}

			return acc
		}, []).filter((d:any) => d != null)

		return data
	}
	catch (err) {
		throw err
	}
}