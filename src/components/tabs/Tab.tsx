"use client";
import { ReactNode, useState } from "react";

export type AbaProps = {
  items: Map<string, ReactNode>;
  selectedIndex?: number;
};

export function Tab({ items, selectedIndex }: AbaProps) {
  const [keys] = useState([...items.keys()]);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex ?? 0);

  return (
    <>
      <div className="flex gap-x-1 z-10">
        {keys.map((title, index) => (
          <button
            className={`border-b-white border-b-[5px] border-gray-300 border-t border-x p-2 rounded-md ${
              currentIndex === index ? "font-bold" : ""
            }`}
            key={title}
            onClick={() => setCurrentIndex(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <hr className="-mt-3" />
      {!isNaN(currentIndex) && (
        <div className="mt-2">{items.get(keys[currentIndex])}</div>
      )}
    </>
  );
}
