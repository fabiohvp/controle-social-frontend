"use client";
import { ReactNode } from "react";
import { FaInfo } from "react-icons/fa";
import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";

type Props = {
  id: string;
  children: ReactNode;
  place?: PlacesType;
};

export default function LegendTooltip(props: Props) {
  return (
    <>
      <span
        className="block bg-gray-light p-1 rounded-full text-white"
        data-tooltip-id={props.id}
        data-tooltip-place={props.place ?? "bottom"}
        style={{ fontSize: ".5rem" }}
      >
        <FaInfo />
      </span>
      <ReactTooltip id={props.id}>{props.children}</ReactTooltip>
    </>
  );
}
