import Iframe from "@/components/iframes/Iframe";

export default function Page() {
  return (
    <Iframe
      src="https://public.tableau.com/views/LevantamentoEducao/EscolasPainel?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=false&:display_static_image=false&:display_spinner=yes&:display_overlay=yes&:display_count=yes&:loadOrderID=0"
      className="h-full mt-2 w-full"
    />
  );
}
