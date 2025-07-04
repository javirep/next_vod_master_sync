import { NextResponse } from 'next/server';
import { getFrequencyEPG } from '../../EPG.service';

export const dynamicParams = true;

export async function GET( _req, {params} ) {
  let { channel } = params;
  const url = `https://epg.frequency.com/output?id=${channel}`

  const FrequencyEPG = await getFrequencyEPG( url );
  
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
