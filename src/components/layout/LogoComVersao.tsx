import Link from "next/link";
import PainelControleLogo from "../images/logos/PainelControleLogo";

export default function LogoComVersao() {
  return (
    <Link href="/" className="relative center">
      <PainelControleLogo />
      <div className="absolute -bottom-3 right-0 text-gray-medium text-xs">
        5.2.10
      </div>
    </Link>
  );
}
