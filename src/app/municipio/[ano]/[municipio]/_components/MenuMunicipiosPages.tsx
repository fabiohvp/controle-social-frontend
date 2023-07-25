"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdown-comparers";
import { useParams, usePathname } from "next/navigation";
import {
  MUNICIPIO_PAGES,
  generateMunicipioUrl,
  getMunicipioSegment,
} from "../municipio-state";

export default function MenuMunicipiosPages() {
  const routeParams = useParams();
  const initialSegment = getMunicipioSegment(usePathname())!;

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateMunicipioUrl({ ...routeParams, segment: item.value.value })
        }
        items={MUNICIPIO_PAGES}
        selected={createDropdownValue(initialSegment)}
      />
    </li>
  );
}
