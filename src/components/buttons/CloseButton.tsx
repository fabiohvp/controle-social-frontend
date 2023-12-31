import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

function CloseButton(
  { ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className="bg-transparent border-0 float-right font-semibold h-6 w-6 leading-none ml-auto opacity-50 p-1"
      {...props}
    >
      &#10006;
    </button>
  );
}

export default forwardRef<HTMLButtonElement, Props>(CloseButton);
