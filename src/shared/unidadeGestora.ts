import { makeSortedMapByValue } from "@/types/Array";
import { loadJsonFile } from "./clientJson";

export type UnidadeGestora = {
	"codigo": string,
	"esferaPoder": string
	"tipoUnidadeGestora": string,
	"esferaAdministrativa": string,
	"cnpj": number,
	"nome": string,
	"sigla": string,
	"endLogradouro": string,
	"endComplemento": string,
	"endBairro": string,
	"endCidade": string,
	"endCEP": string,
	"telefone1": number,
	"codigoUGPai": string
}

let UNIDADES_GESTORAS: UnidadeGestora[] = [];

loadJsonFile("data/unidades-gestoras.json").then(ug => {
	UNIDADES_GESTORAS = ug;
});

export const CODIGO_UNIDADE_GESTORA_CONSORCIO = "501";
export const CODIGO_UNIDADE_GESTORA_ESTADUAL = "500";

export function getUnidadesGestoras(): UnidadeGestora[] {
	return UNIDADES_GESTORAS;
}

export function getUnidadesGestorasConsorcios(): UnidadeGestora[] {
	return UNIDADES_GESTORAS.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
}

export function getUnidadesGestorasEstaduais(): UnidadeGestora[] {
	return UNIDADES_GESTORAS.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
	);
}

export function getUnidadesGestorasMunicipais(): UnidadeGestora[] {
	return UNIDADES_GESTORAS.filter(
		(ug) =>
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
}

export function getTipoUnidadesGestorasEstaduais(): Map<string, string> {
	const unidadesGestoras = UNIDADES_GESTORAS.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
	);
	const tiposUnidadesGestoras = new Map<string, string>();

	for (const unidadeGestora of unidadesGestoras) {
		tiposUnidadesGestoras.set(
			unidadeGestora.codigo.substring(4, 6),
			unidadeGestora.tipoUnidadeGestora
		);
	}
	makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
	return tiposUnidadesGestoras;
}

export function getTipoUnidadesGestorasMunicipais(): Map<string, string> {
	const unidadesGestoras = UNIDADES_GESTORAS.filter(
		(ug) =>
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
	const tiposUnidadesGestoras = new Map<string, string>();

	for (const unidadeGestora of unidadesGestoras) {
		tiposUnidadesGestoras.set(
			unidadeGestora.codigo.substring(4, 6),
			unidadeGestora.tipoUnidadeGestora
		);
	}
	makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
	return tiposUnidadesGestoras;
}
