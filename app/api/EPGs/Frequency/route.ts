import { NextResponse } from 'next/server';
import { getFrequencyEPG } from '../EPG.service';

export async function GET() {
  const FrequencyEPG = await getFrequencyEPG();
  
  return NextResponse.json({
    epg: FrequencyEPG
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}
