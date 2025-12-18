import { NextResponse } from 'next/server';
import { getAmazonEPG } from '../../EPG.service';

export const dynamicParams = true;

export async function GET( _req, {params} ) {
  let { channel } = await params;
  const url = `https://static.frequency.com/studio/epg/amazon/${channel}.xml`

  const FrequencyEPG = await getAmazonEPG( url );
  
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
