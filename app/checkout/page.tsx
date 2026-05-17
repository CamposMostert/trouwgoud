export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] px-6 py-10 text-stone-950">
      <div className="mx-auto max-w-7xl">
        
        <h1 className="mb-10 text-5xl font-semibold">
          Afrekenen
        </h1>

        <div className="grid gap-10 md:grid-cols-[1fr_400px]">
          
          <div className="rounded-[2rem] bg-white p-8 shadow">
            
            <h2 className="mb-8 text-2xl font-semibold">
              Gegevens
            </h2>

            <div className="grid gap-6">
              
              <input
                placeholder="Voornaam"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="Achternaam"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="E-mailadres"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="Telefoonnummer"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="Adres"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="Postcode"
                className="rounded-2xl border border-stone-300 p-4"
              />

              <input
                placeholder="Plaats"
                className="rounded-2xl border border-stone-300 p-4"
              />
            </div>
          </div>

          <div className="h-fit rounded-[2rem] bg-white p-8 shadow">
            
            <h2 className="text-2xl font-semibold">
              Bestelling
            </h2>

            <div className="mt-8 space-y-4">
              
              <div className="flex justify-between text-lg">
                <span>Gouden trouwring</span>
                <span>€999</span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Verzending</span>
                <span>Gratis</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-2xl font-semibold">
                <span>Totaal</span>
                <span>€999</span>
              </div>
            </div>

            <button className="mt-8 w-full rounded-full bg-[#C6A85B] px-8 py-4 text-lg font-medium text-black transition hover:opacity-90">
              Betalen met iDEAL
            </button>

            <p className="mt-4 text-center text-sm text-stone-500">
              Veilige betaling via Mollie
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}