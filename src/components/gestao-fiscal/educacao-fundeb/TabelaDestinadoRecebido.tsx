import { formatMoneyKMB } from "@/formatters/number";

const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

type Registro = {
  nome: string;
  destinado: number[];
  recebido: number[];
};

function formatar(valor: number | undefined) {
  return valor && valor > 0 ? formatMoneyKMB(valor) : "";
}

function somar(valores: number[]) {
  return valores.reduce((soma, valor) => soma + (valor ?? 0), 0);
}

/** Recursos destinados x recebidos por município, mês a mês (valores nominais) */
export default function TabelaDestinadoRecebido({
  registros,
}: {
  registros: Registro[];
}) {
  const ordenados = [...registros].sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR")
  );

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b bg-gray-header text-left">
          <th className="p-2">Município</th>
          <th className="p-2" />
          {MESES.map((mes) => (
            <th key={mes} className="p-2 text-right">
              {mes} (R$)
            </th>
          ))}
          <th className="p-2 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {ordenados.map((registro) => (
          <tr key={registro.nome} className="border-b align-top">
            <td className="p-2 font-bold">{registro.nome}</td>
            <td className="p-2 font-bold">
              <div title="Destinado">DEST</div>
              <div title="Recebido">REC</div>
            </td>
            {MESES.map((mes, indice) => (
              <td key={mes} className="p-2 text-right">
                <div>{formatar(registro.destinado[indice])}</div>
                <div>{formatar(registro.recebido[indice])}</div>
              </td>
            ))}
            <td className="p-2 text-right font-bold">
              <div>{formatar(somar(registro.destinado))}</div>
              <div>{formatar(somar(registro.recebido))}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
