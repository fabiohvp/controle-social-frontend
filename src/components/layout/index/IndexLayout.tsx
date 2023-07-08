type Props = {
  children: JSX.Element[];
};

export default function IndexLayout({
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
      <footer className="bg-[#082b54] flex items-center justify-center mt-12 p-8 text-white max-xl:hidden">
        {footer}
      </footer>
    </>
  );
}
