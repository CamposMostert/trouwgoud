import Link from "next/link";

export default function BedanktPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] px-6 py-10 text-stone-950">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center">
        <div className="rounded-[2rem] bg-white p-8 shadow">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#b08d57]">
            Betaling gestart
          </p>

          <h1 className="text-4xl font-semibold">Bedankt voor je bestelling</h1>

          <p className="mt-6 leading-8 text-stone-600">
            Zodra de betaling is verwerkt, nemen we contact op over de
            trouwringen en eventuele gravering.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#C6A85B] px-8 py-4 font-medium text-black"
          >
            Terug naar Trouwgoud
          </Link>
        </div>
      </div>
    </main>
  );
}
