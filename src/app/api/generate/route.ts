import { NextRequest, NextResponse } from 'next/server';
import { getDestinyNumbers } from '@/lib/destiny';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote } = body;

    if (!quote || typeof quote !== 'string') {
      return NextResponse.json(
        { error: 'Quote is required' },
        { status: 400 }
      );
    }

    const result = getDestinyNumbers(quote);

    return NextResponse.json({
      pool1: result.pool1,
      pool2: result.pool2,
      scenario: result.scenario,
      day: result.day,
      isRestDay: result.isRestDay,
      timestamp: new Date().toISOString(),
      quote,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate numbers' },
      { status: 500 }
    );
  }
}