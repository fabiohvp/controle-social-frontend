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
  }, []);

  function onWindowClick(event: MouseEvent) {
    if (!props.element.current) return;
    if (props.element.current.contains(event.target as Node)) {
      props.toggle((active) => !active);
    } else {
      props.toggle(false);
    }
  }
}
