import { ForwardedRef, IframeHTMLAttributes, forwardRef } from "react";

type Props = IframeHTMLAttributes<HTMLIFrameElement>;

function Iframe({ ...props }: Props, ref: ForwardedRef<HTMLIFrameElement>) {
  return <iframe ref={ref} seamless loading="lazy" {...props} />;
}

export default forwardRef<HTMLIFrameElement, Props>(Iframe);
