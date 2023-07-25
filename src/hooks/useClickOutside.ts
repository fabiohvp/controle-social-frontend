import { RefObject, SetStateAction, useEffect } from "react";

type Props = {
  element: RefObject<HTMLElement>;
  toggle: (value: SetStateAction<boolean>) => void;
};

export default function useClickOutside(props: Props) {
  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, [onWindowClick]);

  function onWindowClick(event: MouseEvent) {
    if (!props.element.current) return;

    const targetElement = event.target as HTMLElement;

    if (props.element.current.contains(targetElement)) {
      if (targetElement.tagName.toLocaleUpperCase() === "INPUT") return;

      props.toggle((active) => !active);
    } else {
      props.toggle(false);
    }
  }
}
