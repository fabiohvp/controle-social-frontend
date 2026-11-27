"use client";
import { useSetAtom } from "jotai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { searchOpenState } from "./searchState";

type Props = {
  className?: string;
  /** Só o ícone (header mobile). */
  compact?: boolean;
};

export default function SearchButton({ className, compact }: Props) {
  const setOpen = useSetAtom(searchOpenState);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K /"
      aria-label={compact ? "Pesquisar" : undefined}
      title="Pesquisar painel (Ctrl+K ou /)"
      className={twMerge(
        "center gap-1 rounded-sm hover:text-link",
        compact && "border h-10 w-10",
        className
      )}
      onClick={() => setOpen(true)}
    >
      <FaMagnifyingGlass aria-hidden="true" />
      {!compact && "Pesquisar"}
    </button>
  );
}
