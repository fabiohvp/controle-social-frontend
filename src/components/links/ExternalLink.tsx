import Link from "next/link";
import { HTMLAttributes } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { twMerge } from "tailwind-merge";

type Props = { href: string } & HTMLAttributes<HTMLAnchorElement>;

export default function ExternalLink({
  children,
  className,
  href,
  ...props
}: Props) {
  return (
    <Link
      className={twMerge("flex items-center gap-1", className)}
      href={href}
      target="_blank"
      {...props}
    >
      {children}
      <LiaExternalLinkAltSolid className="text-xm" />
    </Link>
  );
}
