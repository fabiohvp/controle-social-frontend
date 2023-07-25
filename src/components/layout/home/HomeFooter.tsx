import TCEESLogo from "@/components/images/logos/TceesLogo";
import Link from "next/link";

export default function HomeFooter() {
  return (
    <div className="container flex justify-around">
      <section className="flex flex-col gap-5">
        <Link href="https://www.tcees.tc.br" target="_blank">
          <TCEESLogo fill="white" />
        </Link>
        <h3>
          Telefone geral: &nbsp;
          <Link href="tel:27 3334-7600" className="text-lg">
            (27) 3334-7600
          </Link>
        </h3>
      </section>

      <section className="flex flex-col gap-1">
        <h3 className="text-amber-300">LOCALIZAÇÃO</h3>
        <address className="text-xs mt-1">
          <div>Rua José Alexandre Buaiz, nº 157</div>
          <div>Enseada do Suá - Vitória</div>
          <div>Espírito Santo</div>
          <div>CEP: 29.050-913</div>
          <div>Segunda a sexta-feira, das 12h às 19h</div>
        </address>
      </section>

      <div className="flex flex-col gap-1">
        <h3 className="text-amber-300">LINKS ÚTEIS</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <ul>
              <li className="">
                <Link href="https://www.tcees.tc.br/" target="_blank">
                  Portal TCE-ES
                </Link>
              </li>
              <li className="">
                <Link href="https://www.tcees.tc.br/ouvidoria/" target="_blank">
                  Ouvidoria
                </Link>
              </li>
              <li className="">
                <Link
                  href="https://www.tcees.tc.br/portal-da-transparencia/"
                  target="_blank"
                >
                  Portal da Transparência
                </Link>
              </li>
              <li className="">
                <Link
                  href="https://www.tcees.tc.br/escola/catalogo-de-cursos/curso/?id=678"
                  target="_blank"
                >
                  Curso sobre controle social
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="">
                <Link href="https://geoobras.tcees.tc.br/" target="_blank">
                  Geo-Obras
                </Link>
              </li>
              <li className="">
                <Link
                  href="https://www.tcees.tc.br/imprensa/assessoria-de-comunicacao-tce-es/"
                  target="_blank"
                >
                  Assessoria de Imprensa
                </Link>
              </li>
              <li className="">
                <Link href="/wiki/dados-abertos" className="">
                  Dados Abertos
                </Link>
              </li>
              <li className="">
                <Link href="https://www.amunes.org.br/" target="_blank">
                  AMUNES
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
