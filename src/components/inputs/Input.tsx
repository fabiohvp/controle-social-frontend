import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

function Input(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={`border font-normal px-2 py-1 rounded-sm focus:outline-0 focus:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_8px] focus:shadow-blue-300 focus:border-blue-300 ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);
