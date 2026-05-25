import logo from "../../assets/logo.png";

function LoadingVittaLis() {
  return (
    <main className="min-h-screen overflow-hidden bg-linear-to-b from-[#F7FAF8] via-[#F3F8F5] to-white flex items-center justify-center px-6 text-text">
      <div className="relative w-full max-w-md text-center">
        {/* GLOWS */}
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-green-400/20 blur-[90px]" />

        <div className="absolute right-0 top-40 h-40 w-40 rounded-full bg-orange-400/20 blur-[70px]" />

        <section className="relative z-10 flex flex-col items-center">
          {/* LOADER */}
          <div className="relative flex h-56 w-56 items-center justify-center">
            {/* BORDA EXTERNA */}
            <div className="absolute inset-0 rounded-full border border-green-500/20" />

            {/* SPIN */}
            <div className="absolute inset-3 animate-spin rounded-full border-r-2 border-t-2 border-green-500 border-r-orange-400" />

            {/* PULSE */}
            <div className="absolute inset-8 animate-pulse rounded-full border border-orange-400/20" />

            {/* CENTRO */}
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/40 bg-linear-to-br from-white/70 to-white/10 shadow-[0_0_40px_rgba(34,197,94,0.18)] backdrop-blur-sm">
              <img
                src={logo}
                alt="Logo VittaLis"
                className="h-24 w-24 object-contain drop-shadow-[0_0_25px_rgba(34,197,94,0.25)] animate-pulse"
              />
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-black tracking-wide text-[#004346]">
              VittaLis
            </h1>

            <p className="mt-2 text-sm font-medium text-[#5f6d70]">
              Carregando sua experiência...
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#004346]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#ff6b2c] [animation-delay:0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#004346] [animation-delay:0.3s]" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoadingVittaLis;