import tailwindConfig from "@/../tailwind.config.js";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwind = resolveConfig(tailwindConfig);
const screens = tailwind.theme!.screens! as { [key: string]: string };

export default function useScreenSizeResponsive() {
  const [size, setSize] = useState("xs");

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  function onWindowResize() {
    for (const key in screens) {
      const width = parseInt(screens[key].replace("px", ""));

      if (window.innerWidth <= width) {
        setSize(key);
        break;
      }
    }
  }
  return size;
}
