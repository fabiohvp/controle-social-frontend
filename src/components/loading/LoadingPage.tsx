import PainelControleLogo from "@/components/images/logos/PainelControleLogo";
import Loading from "@/components/loading/Loading";

export default function LoadingPage() {
  return (
    <div className="center flex-col gap-8 h-screen">
      <PainelControleLogo />
      <div className="center">
        <Loading /> Obtendo dados...
      </div>
    </div>
  );
}
