import { NextResponse } from 'next/server';
import { getGasReadings } from '@/lib/store';

export async function GET() {
  const readings = getGasReadings();
  return NextResponse.json(readings);
}
