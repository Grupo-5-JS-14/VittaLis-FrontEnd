import { IconHeadphones as Headphones } from "@tabler/icons-react";

function CardAjuda() {
  return (
    <div className="mt-7 flex flex-col gap-4 rounded-md bg-[#eaf5f3] px-6 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#d6ebe8] text-#12312F">
          <Headphones size={34} fill="#005b5b" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-[#005b5b]">
            Precisa de ajuda com suas apólices?
          </p>
          <p className="mt-1 text-sm text-[#647b78]">
            Nossa equipe está pronta para te ajudar.
          </p>
        </div>
      </div>

      <button className="h-12 rounded-md bg-#12312F px-8 text-sm font-bold text-white transition hover:bg-#004747">
        Fale com um especialista
      </button>
    </div>
  );
}

export default CardAjuda;
