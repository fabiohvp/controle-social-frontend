import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import PainelControleLogo from "../images/logos/PainelControleLogo";

type Props = HTMLAttributes<HTMLAnchorElement>;

export default function LogoComVersao({ className, ...props }: Props) {
  return (
    <Link
      href="/"
      className={twMerge("center h-full relative", className)}
      prefetch={false}
      {...props}
    >
      <PainelControleLogo />
      <div className="absolute bottom-[-2px] right-0 text-gray-medium text-xs">
        5.2.10
      </div>
    </Link>
  );
}
