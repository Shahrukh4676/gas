import { NextResponse } from 'next/server';
import { getGasReadings } from '@/lib/store';

export async function GET() {
  const readings = getGasReadings();
  
  if (readings.length === 0) {
    return NextResponse.json({ message: 'No readings available yet.' }, { status: 404 });
  }
  
  const latest = readings[readings.length - 1];
  return NextResponse.json(latest);
}
