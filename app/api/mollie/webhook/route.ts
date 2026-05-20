export async function POST(request: Request) {
  const formData = await request.formData();
  const paymentId = formData.get("id");

  if (!paymentId) {
    return new Response("Missing payment id", { status: 400 });
  }

  return new Response("OK", { status: 200 });
}
