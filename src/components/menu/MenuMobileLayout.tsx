import MenuMobile from "@/components/menu/MenuMobile";
import { getMunicipios } from "@/shared/municipio";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  maxHeight?: string;
  top?: string;
} & HTMLAttributes<HTMLDivElement>;

export default async function MenuMobileLayout({
  className,
  maxHeight,
  top,
  ...props
}: Props) {
  const municipios = await getMunicipios();

  return (
    <div
      className={twMerge(
        "bg-gray-header fixed h-screen left-0 w-screen z-40 xl:hidden",
        className
      )}
      style={{ top }}
      {...props}
    >
      <MenuMobile municipios={municipios} style={{ maxHeight }} />
    </div>
  );
}
