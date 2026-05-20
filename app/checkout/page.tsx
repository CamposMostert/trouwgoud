"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  engraving: string;
  image: string;
  quantity: number;
};

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
};

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
};

function getSavedCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

export default function CheckoutPage() {
  const [cart] = useState<CartItem[]>(getSavedCart);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function startIdealPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          customer: form,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "De betaling kon niet worden gestart.");
      }

      window.location.href = data.checkoutUrl;
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "De betaling kon niet worden gestart."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-6 py-10 text-stone-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between gap-6">
          <h1 className="text-4xl font-semibold md:text-5xl">Afrekenen</h1>

          <Link href="/winkelwagen" className="text-stone-600 hover:text-black">
            Terug naar winkelwagen
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-8 shadow">
            <p className="text-stone-600">Je winkelwagen is leeg.</p>
          </div>
        ) : (
          <form
            onSubmit={startIdealPayment}
            className="grid gap-10 md:grid-cols-[1fr_400px]"
          >
            <div className="rounded-[2rem] bg-white p-8 shadow">
              <h2 className="mb-8 text-2xl font-semibold">Gegevens</h2>

              <div className="grid gap-6">
                <input
                  required
                  value={form.firstName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  placeholder="Voornaam"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  value={form.lastName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  placeholder="Achternaam"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="E-mailadres"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Telefoonnummer"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="Adres"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  value={form.postalCode}
                  onChange={(event) =>
                    updateField("postalCode", event.target.value)
                  }
                  placeholder="Postcode"
                  className="rounded-2xl border border-stone-300 p-4"
                />

                <input
                  required
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="Plaats"
                  className="rounded-2xl border border-stone-300 p-4"
                />
              </div>
            </div>

            <div className="h-fit rounded-[2rem] bg-white p-8 shadow">
              <h2 className="text-2xl font-semibold">Bestelling</h2>

              <div className="mt-8 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.engraving}-${index}`}
                    className="border-b border-stone-100 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between gap-4 text-lg">
                      <span>{item.name}</span>
                      <span>€{item.price * item.quantity}</span>
                    </div>

                    <p className="mt-1 text-sm text-stone-500">
                      {item.quantity}x, maat {item.size}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between text-lg">
                  <span>Verzending</span>
                  <span>Gratis</span>
                </div>

                <div className="flex justify-between border-t pt-4 text-2xl font-semibold">
                  <span>Totaal</span>
                  <span>€{total}</span>
                </div>
              </div>

              {error ? (
                <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-full bg-[#C6A85B] px-8 py-4 text-lg font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Betaling starten..." : "Betalen met iDEAL"}
              </button>

              <p className="mt-4 text-center text-sm text-stone-500">
                Veilige betaling via Mollie
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
