import { NextResponse } from 'next/server';
import { getPlutoEPG } from '../../EPG.service';

export const dynamicParams = true;

export async function GET( _req, {params} ) {
  let { channel } = await params;
  const url = `https://epg.frequency.com/output?id=${channel}`

  const FrequencyEPG = await getPlutoEPG( url );
  
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
