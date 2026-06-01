import { NextResponse } from 'next/server';
import { addGasReading } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (typeof body.gasValue !== 'number') {
      return NextResponse.json({ error: 'gasValue must be a number' }, { status: 400 });
    }

    const reading = addGasReading({ gasValue: body.gasValue });
    return NextResponse.json(reading, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
