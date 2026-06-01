let latestGasValue = 0;

export async function POST(req: Request) {
  const body = await req.json();

  latestGasValue = body.gasValue;

  return Response.json({
    success: true,
    gasValue: latestGasValue,
  });
}

export async function GET() {
  return Response.json({
    gasValue: latestGasValue,
  });
}
