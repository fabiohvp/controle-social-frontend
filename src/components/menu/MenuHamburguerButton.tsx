"use client";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import HamburgerButton from "../buttons/hamburguer/HamburguerButton";
import MenuMobileLayout from "./MenuMobileLayout";
import { HAMBURGUER_MENU_SIZE } from "./menuConstants";

type Props = HTMLAttributes<HTMLButtonElement>;

export default function MenuHamburguerButton({ className, ...props }: Props) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <button
        className={twMerge(
          "border center h-10 rounded-xs text-xl w-10",
          className
        )}
        onClick={() => setMenuActive(!menuActive)}
        {...props}
      >
        <HamburgerButton
          hamburguer={{
            toggled: menuActive,
            color: "var(--color-blue-menu)",
            size: HAMBURGUER_MENU_SIZE,
          }}
        />
      </button>

      {menuActive && <MenuMobileLayout />}
    </>
  );
}
