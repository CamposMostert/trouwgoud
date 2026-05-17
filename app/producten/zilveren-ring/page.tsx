"use client";

import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  engraving: string;
  image: string;
  quantity: number;
};

export default function ZilverenRingPage() {
  const [size, setSize] = useState("18");
  const [engraving, setEngraving] = useState("");

  function addToCart() {
    const product: CartItem = {
      id: "zilveren-ring",
      name: "Zilveren trouwring",
      price: 799,
      size,
      engraving,
      image: "/Zilveren ringen1.png",
      quantity: 1,
    };

    const savedCart = localStorage.getItem("cart");
    const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === product.size &&
        item.engraving === product.engraving
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/winkelwagen";
  }

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-6 py-10 text-stone-950">
      <div className="mx-auto mb-10 flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          Trouwgoud
        </Link>

        <Link
          href="/winkelwagen"
          className="rounded-full border border-stone-300 px-6 py-3 text-sm"
        >
          Winkelwagen
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow">
          <img
            src="/Zilveren ringen1.png"
            alt="Zilveren trouwring"
            className="h-[550px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-stone-500">
            Trouwgoud collectie
          </p>

          <h1 className="text-5xl font-semibold">Zilveren trouwring</h1>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            Moderne zilveren trouwring met een rustige, minimalistische
            uitstraling. Perfect voor koppels die houden van eenvoud en stijl.
          </p>

          <p className="mt-8 text-4xl font-semibold">€799</p>

          <div className="mt-8">
            <label className="mb-2 block text-sm font-medium">Ringmaat</label>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-2xl border border-stone-300 bg-white p-4"
            >
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Gravering
            </label>

            <input
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder="Bijv. 12-06-2026"
              className="w-full rounded-2xl border border-stone-300 bg-white p-4"
            />
          </div>

          <button
            onClick={addToCart}
            className="mt-8 rounded-full bg-stone-300 px-8 py-4 text-lg font-medium text-black transition hover:bg-stone-400"
          >
            Toevoegen aan winkelwagen
          </button>

          <div className="mt-8 space-y-2 text-sm text-stone-600">
            <p>✓ Gratis verzending</p>
            <p>✓ Persoonlijke gravering mogelijk</p>
            <p>✓ Advies op afspraak</p>
          </div>
        </div>
      </div>
    </main>
  );
}