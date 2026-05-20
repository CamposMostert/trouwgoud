"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  engraving: string;
  image: string;
  quantity: number;
};

function getSavedCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

export default function WinkelwagenPage() {
  const [cart, setCart] = useState<CartItem[]>(getSavedCart);

  function saveCart(newCart: CartItem[]) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeItem(index: number) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    saveCart(newCart);
  }

  function changeQuantity(index: number, amount: number) {
    const newCart = [...cart];
    newCart[index].quantity += amount;

    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }

    saveCart(newCart);
  }

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-6 py-10 text-stone-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Winkelwagen</h1>

          <Link href="/" className="text-stone-600 hover:text-black">
            Verder winkelen
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-8 shadow">
            <p className="text-stone-600">Je winkelwagen is leeg.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.engraving}-${index}`}
                  className="rounded-[2rem] bg-white p-6 shadow"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-40 rounded-2xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-stone-600">
                          Ringmaat: {item.size}
                        </p>

                        <p className="text-stone-600">
                          Gravering: {item.engraving || "Geen"}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => changeQuantity(index, -1)}
                          className="rounded-lg border px-3 py-1"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => changeQuantity(index, 1)}
                          className="rounded-lg border px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="text-2xl font-semibold">
                        €{item.price * item.quantity}
                      </p>

                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:underline"
                      >
                        Verwijderen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-[2rem] bg-white p-8 shadow">
              <h2 className="text-2xl font-semibold">Overzicht</h2>

              <div className="mt-8 space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotaal</span>
                  <span>€{total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Verzending</span>
                  <span>Gratis</span>
                </div>

                <div className="flex justify-between border-t pt-4 text-2xl font-semibold">
                  <span>Totaal</span>
                  <span>€{total}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full rounded-full bg-[#C6A85B] px-8 py-4 text-center text-lg font-medium text-black"
              >
                Afrekenen
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
