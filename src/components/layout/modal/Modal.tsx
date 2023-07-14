"use client";

export type ModalProps = {
  setShow: (show: boolean) => void;
  show: boolean;
};

type Props = {
  children: JSX.Element[];
} & ModalProps;

export default function Modal({
  children: [header, main, footer],
  setShow,
  show,
}: Props) {
  return (
    <>
      {show ? (
        <>
          <div className="center text-gray-medium overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <header className="flex items-start justify-between py-2 px-3 border-b border-solid border-slate-200 rounded-t">
                  <h3>{header}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent opacity-50 h-6 w-6 text-lg block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </header>
                <main className="relative p-3 flex-auto max-h-[65vh] overflow-y-auto">
                  {main}
                </main>
                {footer && (
                  <footer className="flex items-center justify-end py-3 px-5 border-t border-solid border-slate-200 rounded-b">
                    {footer}
                  </footer>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
