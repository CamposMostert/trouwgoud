type CartItem = {
  id: string;
  name: string;
  size: string;
  engraving: string;
  quantity: number;
};

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
};

type MolliePaymentResponse = {
  id: string;
  _links?: {
    checkout?: {
      href?: string;
    };
  };
};

const products = {
  "gouden-ring": {
    name: "Gouden trouwring",
    price: 999,
  },
  "zilveren-ring": {
    name: "Zilveren trouwring",
    price: 799,
  },
} as const;

function getBaseUrl(request: Request) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_SITE_URL ||
    new URL(request.url).origin
  ).replace(/\/$/, "");
}

function isPublicUrl(url: string) {
  return !url.includes("localhost") && !url.includes("127.0.0.1");
}

function isCustomerComplete(customer: Partial<Customer>) {
  return (
    customer.firstName?.trim() &&
    customer.lastName?.trim() &&
    customer.email?.trim() &&
    customer.phone?.trim() &&
    customer.address?.trim() &&
    customer.postalCode?.trim() &&
    customer.city?.trim()
  );
}

function buildOrder(cart: CartItem[]) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Je winkelwagen is leeg.");
  }

  const lines = cart.map((item) => {
    const product = products[item.id as keyof typeof products];
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1) {
      throw new Error("De winkelwagen bevat een ongeldig product.");
    }

    return {
      id: item.id,
      name: product.name,
      quantity,
      size: String(item.size || ""),
      engraving: String(item.engraving || ""),
      unitPrice: product.price,
      total: product.price * quantity,
    };
  });

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.total, 0),
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.MOLLIE_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "De Mollie API-key ontbreekt. Voeg MOLLIE_API_KEY toe aan .env.local en herstart de server.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const customer = body.customer as Partial<Customer>;
    const order = buildOrder(body.cart);

    if (!isCustomerComplete(customer)) {
      return Response.json(
        { error: "Vul alle verplichte gegevens in." },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const paymentPayload = {
      amount: {
        currency: "EUR",
        value: order.total.toFixed(2),
      },
      description: `Trouwgoud bestelling - ${customer.firstName} ${customer.lastName}`,
      method: "ideal",
      redirectUrl: `${baseUrl}/checkout/bedankt`,
      ...(isPublicUrl(baseUrl)
        ? { webhookUrl: `${baseUrl}/api/mollie/webhook` }
        : {}),
      metadata: {
        customer,
        orderLines: order.lines,
      },
    };

    const response = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    const payment = (await response.json()) as MolliePaymentResponse & {
      detail?: string;
    };

    if (!response.ok) {
      return Response.json(
        { error: payment.detail || "Mollie kon de betaling niet aanmaken." },
        { status: response.status }
      );
    }

    const checkoutUrl = payment._links?.checkout?.href;

    if (!checkoutUrl) {
      return Response.json(
        { error: "Mollie gaf geen checkoutlink terug." },
        { status: 502 }
      );
    }

    return Response.json({
      paymentId: payment.id,
      checkoutUrl,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "De betaling kon niet worden gestart.",
      },
      { status: 400 }
    );
  }
}
