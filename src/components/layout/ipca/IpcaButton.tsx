"use client";
import CloseButton from "@/components/buttons/close/CloseButton";
import Loading from "@/components/loading/Loading";
import useClickOutside from "@/hooks/useClickOutside";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import DropdownModal from "../../dropdowns/dropdown/DropdownModal";
import IpcaCheckbox from "./IpcaCheckbox";
import { ipcaLoading } from "./ipcaState";

export default function IpcaButton() {
  const [active, setActive] = useState(false);
  const [loading] = useAtom(ipcaLoading);
  let element = useRef<HTMLDivElement>(null);

  useClickOutside({ element, toggle: setActive });

  if (loading) return <Loading />;

  return (
    <>
      <IpcaCheckbox className="hidden md:block" />
      <div ref={element} className="center min-w-[20px] md:hidden">
        <FaCog />
        {active && (
          <DropdownModal>
            <div className="center h-10 p-2 border-b">
              <span className="font-bold">Opções </span>
              <CloseButton onClick={() => setActive(false)} />
            </div>
            <IpcaCheckbox className="px-2 py-4 w-full" />
          </DropdownModal>
        )}
      </div>
    </>
  );
}
