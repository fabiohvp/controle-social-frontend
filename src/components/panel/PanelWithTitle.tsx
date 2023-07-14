import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  legend?: ReactNode;
  style?: CSSProperties;
  title: string;
};

export default function PanelWithTitle(props: Props) {
  return (
    <section>
      <h5 className="bg-gray-header border font-normal px-2 py-1 rounded-t-md">
        {props.title}
        <span className="float-right">{props.legend}</span>
      </h5>
      <div
        className={`border-b border-x p-2 overflow-hidden rounded-b-md ${
          props.className ?? ""
        }`}
        style={props.style}
      >
        {props.children}
      </div>
    </section>
  );
}
