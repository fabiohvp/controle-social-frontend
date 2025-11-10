import { makeSortedMapByValue } from "@/types/Array";

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

export const CODIGO_UNIDADE_GESTORA_CONSORCIO = "501";
export const CODIGO_UNIDADE_GESTORA_ESTADUAL = "500";

export function getUnidadesGestorasConsorcios(unidadesGestoras: UnidadeGestora[]): UnidadeGestora[] {
	return unidadesGestoras.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
}

export function getUnidadesGestorasEstaduais(unidadesGestoras: UnidadeGestora[]): UnidadeGestora[] {
	return unidadesGestoras.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
	);
}

export function getUnidadesGestorasMunicipais(unidadesGestoras: UnidadeGestora[]): UnidadeGestora[] {
	return unidadesGestoras.filter(
		(ug) =>
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
}

export function getTipoUnidadesGestorasEstaduais(unidadesGestoras: UnidadeGestora[]): Map<string, string> {
	const filteredUnidadesGestoras = unidadesGestoras.filter((ug) =>
		ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
	);
	const tiposUnidadesGestoras = new Map<string, string>();

	for (const unidadeGestora of filteredUnidadesGestoras) {
		tiposUnidadesGestoras.set(
			unidadeGestora.codigo.substring(4, 6),
			unidadeGestora.tipoUnidadeGestora
		);
	}
	makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
	return tiposUnidadesGestoras;
}

export function getTipoUnidadesGestorasMunicipais(unidadesGestoras: UnidadeGestora[]): Map<string, string> {
	const filteredUnidadesGestoras = unidadesGestoras.filter(
		(ug) =>
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
			!ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
	);
	const tiposUnidadesGestoras = new Map<string, string>();

	for (const unidadeGestora of filteredUnidadesGestoras) {
		tiposUnidadesGestoras.set(
			unidadeGestora.codigo.substring(4, 6),
			unidadeGestora.tipoUnidadeGestora
		);
	}
	makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
	return tiposUnidadesGestoras;
}
