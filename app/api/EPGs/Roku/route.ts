import { NextResponse } from 'next/server';
import { getRokuEPG } from '../EPG.service';

export async function GET() {
  const RokuEPG = await getRokuEPG();
  
  return NextResponse.json({
    epg: RokuEPG
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}
