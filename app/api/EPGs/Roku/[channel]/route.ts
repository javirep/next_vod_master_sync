import { NextResponse } from 'next/server';
import { getRokuEPG } from '../../EPG.service';

export const dynamicParams = true;

export async function GET( _req, { params } ) {

  let { channel } = await params;
  
  const url = `https://epg.frequency.com/output?id=${channel}&format=roku_true_epg`

  const RokuEPG = await getRokuEPG( url );
  
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
