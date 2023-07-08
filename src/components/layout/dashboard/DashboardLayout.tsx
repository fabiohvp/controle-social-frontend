type Props = {
  children: JSX.Element[];
};

export default function DashboardLayout({
  children: [header, main, footer],
}: Props) {
  return (
    <>
      <header className="flex items-center justify-between pt-3 pb-5 px-8 bg-gradient-to-b from-[#E9E6E2]">
        {header}
      </header>
      <main className="text-sky-700 mt-4 flex flex-col flex-wrap gap-8">
        {main}
      </main>
      <footer className="flex justify-center mt-6 p-2">
        <div className="w-5/12">
          <hr />
          <div className="flex items-center justify-center">{footer}</div>
        </div>
      </footer>
    </>
  );
}
