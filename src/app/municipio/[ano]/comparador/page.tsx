import DropdownMunicipiosNomes from "./_components/DropdownMunicipiosNomes";

export default function Page() {
  return (
    <>
      <table className="table mt-2 text-sm">
        <thead>
          <tr>
            <th className="bg-white w-[280px]"></th>
            <th className="fundo">
              <DropdownMunicipiosNomes />
            </th>
            <th className="fundo">
              <DropdownMunicipiosNomes />
            </th>
            <th className="fundo">
              <DropdownMunicipiosNomes />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>População (habitantes)</td>
            <td>30.684</td>
            <td>9.711</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
