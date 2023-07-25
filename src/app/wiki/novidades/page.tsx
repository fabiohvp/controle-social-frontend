import WikiLayout from "@/components/layout/wiki/WikiLayout";
import Novidades from "./_components/Novidades";

export default function Page() {
  return (
    <WikiLayout title="Novidades">
      <Novidades />
    </WikiLayout>
  );
}
