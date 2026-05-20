import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <Link href="/" className="flex items-center">
            <img
              src="/grote-logo.png"
              alt="Trouwgoud"
              className="h-32 w-auto object-contain"
            />
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#collectie">Collectie</a>
            <a href="#informatie">Informatie</a>
            <a href="#contact">Contact</a>
            <Link href="/winkelwagen">Winkelwagen</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#f3efe8]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#b08d57]">
              Luxe trouwringen
            </p>

            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
              Tijdloze trouwringen in goud en zilver
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Elegante trouwringen met persoonlijke gravering, hoogwaardige
              afwerking en een rustige luxe uitstraling.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#collectie"
                className="rounded-full bg-[#C6A85B] px-8 py-4 text-center text-lg font-medium text-black"
              >
                Bekijk collectie
              </a>

              <a
                href="#contact"
                className="rounded-full border border-stone-300 px-8 py-4 text-center text-lg hover:bg-black hover:text-white"
              >
                Afspraak maken
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-2xl">
            <img
              src="/ringen.png"
              alt="Gouden trouwringen"
              className="h-[620px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>
        <div className="gold-line mx-auto max-w-5xl"></div>
      <section id="collectie" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-stone-500">
            Collectie
          </p>

          <h2 className="text-5xl font-semibold">Onze trouwringen</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href="/producten/gouden-ring"
            className="overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-1"
          >
            <img
              src="/ringen1.png"
              alt="Gouden trouwringen"
              className="h-80 w-full object-cover"
            />

            <div className="p-8">
              <h3 className="text-2xl font-semibold">Gouden trouwringen</h3>
              <p className="mt-4 text-stone-600">
                Tijdloze trouwringen met warme gouden afwerking.
              </p>
              <p className="mt-6 text-xl font-semibold">Vanaf €999</p>
            </div>
          </Link>

          <Link
            href="/producten/zilveren-ring"
            className="overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-1"
          >
            <img
              src="/Zilveren ringen1.png"
              alt="Zilveren trouwringen"
              className="h-80 w-full object-cover"
            />

            <div className="p-8">
              <h3 className="text-2xl font-semibold">Zilveren trouwringen</h3>
              <p className="mt-4 text-stone-600">
                Minimalistische ringen met een moderne uitstraling.
              </p>
              <p className="mt-6 text-xl font-semibold">Vanaf €799</p>
            </div>
          </Link>

          <a
            href="#contact"
            className="overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-1"
          >
            <img
              src="/ringen4.png"
              alt="Maatwerk trouwringen"
              className="h-80 w-full object-cover"
            />

            <div className="p-8">
              <h3 className="text-2xl font-semibold">Maatwerk</h3>
              <p className="mt-4 text-stone-600">
                Persoonlijk ontworpen trouwringen met gravering.
              </p>
              <p className="mt-6 text-xl font-semibold">Op aanvraag</p>
            </div>
          </a>
        </div>
      </section>

      <section id="informatie" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold">Gratis verzending</h3>
            <p className="mt-3 text-stone-600">
              Veilig en verzekerd verzonden.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Persoonlijke gravering</h3>
            <p className="mt-3 text-stone-600">
              Maak jullie ringen uniek.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Goud & zilver</h3>
            <p className="mt-3 text-stone-600">
              Alleen luxe materialen.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Advies op afspraak</h3>
            <p className="mt-3 text-stone-600">
              Persoonlijke begeleiding bij maat en stijl.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-stone-950">
        <div className="mx-auto max-w-7xl px-6 py-24 text-white">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-stone-400">
            Contact
          </p>

          <h2 className="max-w-3xl text-5xl font-semibold">
            Plan een afspraak voor jullie trouwringen
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-stone-300">
            Neem contact op voor advies over goud, zilver, maten en gravering.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:info@trouwgoud.nl"
              className="rounded-full bg-[#C6A85B] px-8 py-4 text-center font-medium text-black"
            >
              Mail ons
            </a>

            <Link
              href="/winkelwagen"
              className="rounded-full border border-white px-8 py-4 text-center"
            >
              Naar winkelwagen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}