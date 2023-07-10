import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  legend?: ReactNode;
  height?: string;
  style?: CSSProperties;
  title: string;
};

export default function PanelWithTitle(props: Props) {
  return (
    <section className={`${props.className ?? ""}`}>
      <h5
        className="bg-gray-header border font-normal px-2 py-1 rounded-t-md"
        style={props.style}
      >
        {props.title}
      </h5>
      <div
        className="border-b border-x p-2 overflow-hidden rounded-b-md"
        style={{ height: props.height ?? "60px" }}
      >
        {props.children}
      </div>
    </section>
  );
}
