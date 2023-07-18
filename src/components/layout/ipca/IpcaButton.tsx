"use client";
import CloseButton from "@/components/buttons/close/CloseButton";
import useClickOutside from "@/hooks/useClickOutside";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import DropdownModal from "../../dropdowns/dropdown/DropdownModal";

const IpcaCheckbox = dynamic(() => import("./IpcaCheckbox"), { ssr: false });

export default function IpcaButton() {
  const [active, setActive] = useState(false);
  let element = useRef<HTMLDivElement>(null);

  useClickOutside({ element, toggle: setActive });

  return (
    <>
      <IpcaCheckbox className="hidden md:block" />
      <div ref={element} className="md:hidden">
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
