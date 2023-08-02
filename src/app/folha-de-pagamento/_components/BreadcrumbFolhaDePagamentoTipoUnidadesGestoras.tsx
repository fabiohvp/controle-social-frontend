"use client";
import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { normalize } from "@/formatters/string";
import {
  UnidadeGestora,
  getUnidadesGestoras,
  getUnidadesGestorasMunicipais,
} from "@/shared/unidadeGestora";
import { groupBy } from "@/types/Array";
import { useParams, usePathname } from "next/navigation";
import {
  FolhaDePagamentoPageProps,
  generateFolhaDePagamentoUrl,
} from "../[poder]/[ano]/[mes]/routes";

type Option = {
  nome: string;
  codigo: string;
  unidadesGestoras: Option[];
};

type OptionsAndComparer = [Option[], typeof municipioComparer];

const EMPTY_OPTIONS: OptionsAndComparer = [[], () => false];

const TODOS_OPTION = {
  nome: "Todos",
  codigo: "todos",
  unidadesGestoras: [],
};

export default function BreadcrumbFolhaDePagamentoTipoUnidadesGestoras() {
  const routeParams = useParams() as FolhaDePagamentoPageProps;
  const pathname = usePathname();
  const [options, selectedComparer] = getUnidadesGestorasPorPoder(
    routeParams.poder
  );

  if (!options.length) {
    return <></>;
  }

  const selectedUnidadeGestora =
    options.find((ug) =>
      selectedComparer(routeParams.unidadeGestora, ug.codigo)
    ) ?? TODOS_OPTION;

  return (
    <>
      {options.length === 2 ? ( //2 pois o primeiro é Todos
        <DropdownItemLabel>
          <span className="ellipsis">{options[1].nome}</span>
        </DropdownItemLabel>
      ) : (
        <li>
          <DropdownLinks
            bodyProps={{ className: "!min-w-[400px]" }}
            comparer={dropdownStartsWithComparer}
            generateUrl={(item) =>
              generateFolhaDePagamentoUrl({
                ...routeParams,
                unidadeGestora:
                  routeParams.poder === "assembleia-legislativa"
                    ? ""
                    : item[1].value,
                item,
                pathname,
              })
            }
            items={
              new Map(
                options.map((option) => [
                  option.nome,
                  createDropdownValue(option.codigo),
                ])
              )
            }
            selected={createDropdownValue(selectedUnidadeGestora.codigo)}
          />
        </li>
      )}
      <BreadcrumbFolhaDePagamentoUnidadesGestoras
        unidadesGestoras={selectedUnidadeGestora.unidadesGestoras}
      />
    </>
  );
}

function BreadcrumbFolhaDePagamentoUnidadesGestoras({
  unidadesGestoras,
}: {
  unidadesGestoras: Option[];
}) {
  const pathname = usePathname();
  const routeParams = useParams() as FolhaDePagamentoPageProps;

  if (!unidadesGestoras.length) {
    return <></>;
  }

  if (unidadesGestoras.length === 1) {
    return (
      <DropdownItemLabel>
        <span className="ellipsis">{unidadesGestoras[0].nome}</span>
      </DropdownItemLabel>
    );
  }

  let selectedValue = routeParams.unidadeGestora;
  let options = [TODOS_OPTION, ...unidadesGestoras];

  if (routeParams.unidadeGestora.length < 11) {
    selectedValue = "todos";
  }

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[400px]" }}
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            item,
            pathname,
            unidadeGestora: item[1].value,
          })
        }
        items={
          new Map(
            options.map((option) => [
              option.nome,
              createDropdownValue(option.codigo),
            ])
          )
        }
        selected={createDropdownValue(selectedValue)}
      />
    </li>
  );
}

function getUnidadesGestorasPorPoder(poder: string) {
  if (poder === "executivo-estadual") {
    const ugs = getUnidadesGestoras().filter((ug) =>
      ug.codigo.startsWith("500E")
    );
    return groupByTipoUnidadesGestoras("tipoUnidadeGestora", ugs);
  }
  if (poder === "judiciario-estadual") {
    const ugs = getUnidadesGestoras().filter((ug) =>
      ug.codigo.startsWith("500J")
    );
    return mapByNomeGestoras(ugs);
  }
  if (poder === "assembleia-legislativa") {
    return EMPTY_OPTIONS;
  }
  if (poder === "defensoria-publica") {
    const ugs = getUnidadesGestoras().filter((ug) =>
      ug.codigo.startsWith("500D")
    );
    return mapByNomeGestoras(ugs);
  }
  if (poder === "ministerio-publico") {
    const ugs = getUnidadesGestoras().filter((ug) =>
      ug.codigo.startsWith("500M")
    );
    return mapByNomeGestoras(ugs);
  }
  if (poder === "tribunal-de-contas") {
    return EMPTY_OPTIONS;
  }
  if (poder === "executivo-municipal") {
    const ugs = getUnidadesGestorasMunicipais().filter((ug) => {
      const tipo = ug.codigo.substring(3, 6);
      return tipo === "E05" || tipo === "E07";
    });
    return groupByMunicipio(ugs);
  }
  if (poder === "legislativo-municipal") {
    const ugs = getUnidadesGestorasMunicipais().filter(
      (ug) => ug.codigo.charAt(3) === "L"
    );
    return groupByTipoUnidadesGestoras("tipoUnidadeGestora", ugs);
  }
  const ugs = getUnidadesGestorasMunicipais();
  return groupByMunicipio(ugs);
}

function groupByMunicipio(ugs: UnidadeGestora[]): OptionsAndComparer {
  const groups = groupBy(ugs, (ug) => ug.esferaAdministrativa);
  const items: Option[] = [];

  for (const [_, values] of groups) {
    const unidadesGestoras = values.map((ug) => ({
      nome: ug.nome,
      codigo: ug.codigo,
      unidadesGestoras: [],
    }));
    unidadesGestoras.sort((a, b) =>
      normalize(a.nome) > normalize(b.nome) ? 1 : -1
    );

    items.push({
      nome: values[0].esferaAdministrativa,
      codigo: values[0].codigo.substring(0, 3),
      unidadesGestoras,
    });
  }
  items.sort((a, b) => (normalize(a.nome) > normalize(b.nome) ? 1 : -1));
  return [[TODOS_OPTION, ...items], municipioComparer];
}

function groupByTipoUnidadesGestoras(
  propertyName: keyof UnidadeGestora,
  ugs: UnidadeGestora[]
): OptionsAndComparer {
  const groups = groupBy(ugs, (ug) => ug.tipoUnidadeGestora);
  const items: Option[] = [];

  for (const [_, values] of groups) {
    const unidadesGestoras = values.map((ug) => ({
      nome: ug.nome,
      codigo: ug.codigo,
      unidadesGestoras: [],
    }));
    unidadesGestoras.sort((a, b) =>
      normalize(a.nome) > normalize(b.nome) ? 1 : -1
    );

    items.push({
      nome: values[0][propertyName] as string,
      codigo: values[0].codigo.substring(4, 6),
      unidadesGestoras,
    });
  }
  items.sort((a, b) => (normalize(a.nome) > normalize(b.nome) ? 1 : -1));
  return [[TODOS_OPTION, ...items], tipoUgComparer];
}

function mapByNomeGestoras(ugs: UnidadeGestora[]): OptionsAndComparer {
  const items: Option[] = ugs.map((ug) => ({
    nome: ug.nome,
    codigo: ug.codigo,
    unidadesGestoras: [],
  }));
  items.sort((a, b) => (normalize(a.nome) > normalize(b.nome) ? 1 : -1));
  return [[TODOS_OPTION, ...items], municipioComparer];
}

function municipioComparer(selectedCodigo: string, codigo: string) {
  return selectedCodigo?.startsWith(codigo);
}

function tipoUgComparer(selectedCodigo: string, codigo: string) {
  return (
    selectedCodigo === codigo || selectedCodigo?.substring(4, 6) === codigo
  );
}
